import { memo, useCallback, useRef, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector as useSelectorStore } from 'react-redux';
import useSelector from "../../hooks/use-selector";
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import commentsActions from '../../store-redux/comments/actions';
import ItemComment from '../../components/item-comment';
import Spinner from '../../components/spinner';
import InputComment from '../../components/input-comment';
import RequestLogin from '../../components/request-login';
import CommentBottom from '../../components/comment-bottom';
import shallowequal from 'shallowequal';
import listToTree from '../../utils/list-to-tree';

function CommentsCard() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelectorStore(
    state => ({
      waiting: state.comments.waiting,
      comments: state.comments.items,
      commentsCount: state.comments.count,
      currentComment: state.comments.current,
      currentUser: state.comments.currentUser,
      articleId: state.article.data._id,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const selectState = useSelector(
    state => ({
      sessionExist: state.session.exists,
      token: state.session.token,
      sessionUserId: state.session.user._id,
    }),
  );

  const { t } = useTranslate();

  const onAddComment= (id, token, type, text) => {
    if (text.trim().length > 0) {
      dispatch(commentsActions.record(id, token, type, text));
      // dispatch(commentsActions.load(params.id));
    }

  }

  const inputCommentRef = useRef(null);

  const onClickAnswer = (_id, user) => {
    dispatch(commentsActions.setCurrent(_id, user));
    if (inputCommentRef.current) {
      inputCommentRef.current.scrollIntoView();
    }

  }



  const callbacks = {
    // Установка текущего комментария
    // setCurrentComment: useCallback((_id, user) => dispatch(commentsActions.setCurrent(_id, user)), [store]),
    setCurrentComment: useCallback((_id, user) => onClickAnswer(_id, user), [store]),
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
    recordComment: useCallback((id, token, type, text) =>
      onAddComment(id, token, type, text), [store]),
  };

  const inputCommentComponent = selectState.sessionExist
    ? <InputComment
        ref = {inputCommentRef}
        onSend = {callbacks.recordComment}
        onCancel={callbacks.setCurrentComment}
        defaultText={'Мой ответ для ' + select.currentUser}
        id={select.currentComment}
        token={selectState.token}
        type = "comment"
      />
    : <RequestLogin
        onLogin={callbacks.onSignIn}
        onCancel={callbacks.setCurrentComment}
      />;

  const renders = (arr) => arr
    ?
      [...arr.map((i, n) =>
        <ItemComment
          item={i}
          key={n}
          currentComment={select.currentComment}
          inputComment = {inputCommentComponent}
          onAnswer={callbacks.setCurrentComment}
          sessionUserId = {selectState.sessionUserId}
          layer = {1}
        />
      )]
    :
      null;

  const itemsComments = (Array.isArray(select.comments) && select.comments.length != 0)
    ? listToTree(select.comments)[0].children
    : null;


  return (
    <Spinner active={select.waiting}>
      <h3>Комментариев ({select.commentsCount})</h3>
      <CommentBottom margin="right">{renders(itemsComments)}</CommentBottom>
      {!select.currentComment && <CommentBottom margin="two">{selectState.sessionExist
                                  ? <InputComment
                                      onSend = {callbacks.recordComment}
                                      title="Новый комментарий"
                                      id={select.articleId}
                                      token={selectState.token}
                                      type = "article"
                                      showCancel={false}
                                    />
                                  : <RequestLogin
                                      requestText=', чтобы иметь возможность комментировать.'
                                      showCancel = {false}
                                      onLogin={callbacks.onSignIn}
                                    />}</CommentBottom>}

    </Spinner>
  );
}

export default memo(CommentsCard);
