import { generateComment } from '../mock/comment.js';

export default class CommentsModel {
  comments = Array.from({length: 15}, generateComment);

  getComments = () => this.comments;
}
