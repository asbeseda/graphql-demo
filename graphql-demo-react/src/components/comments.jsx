import React, { Component } from 'react';

export default class Comments extends Component {
  comments = this.props['comments'];
  limit = 10;
  offset = 0;

  render() {
    const comms = this.comments.slice(this.offset, this.offset + this.limit);
    const page = (limit) => {
      this.offset += limit;
      this.forceUpdate();
    };
    const Comments = () => (
      <div>
        <div className="label">Отзывы о книге</div>

        <table>
          <thead>
          <tr>
            <th>Пользователь</th>
            <th>Комментарий</th>
          </tr>
          </thead>
          <tbody>
          {comms.map((comm, idx) =>
            <tr key={idx}>
              <td>{comm.user.name}</td>
              <td>{comm.content}</td>
            </tr>
          )}
          </tbody>
        </table>


        <p/>
        <div className="paging">
          <button className="btn" onClick={() => page(-this.limit)} disabled={this.offset <= 0}>
            {'<< предыдущие ' + this.limit}
          </button>
          &nbsp; {this.offset + 1}-{Math.min(this.offset + this.limit, this.comments.length)} из {this.comments.length} &nbsp;
          <button className="btn" onClick={() => page(this.limit)}
                  disabled={this.offset + this.limit >= this.comments.length}>
            {'следующие ' + this.limit + ' >>'}
          </button>
        </div>
        <p/>
      </div>
    );

    return Comments();
  }
}
