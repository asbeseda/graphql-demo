import React, { Component } from 'react';

export default class Page extends Component {
  render() {
    return <div className="page">
      <div className="page-outer">
        <div className="page-inner">
          <div className="page-header">
            <div className="page-header-title">{this.props.title}</div>
          </div>
          <div className="page-content">
            {this.props.children}
          </div>
        </div>
      </div>
    </div>;
  }
}
