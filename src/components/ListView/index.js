import React, { Component } from 'react';

class ListView extends Component {
  constructor(props) {
		super(props);
		this.listRef = React.createRef();
  }
  
  _onScroll = () => {
    const { onEndReached } = this.props;
		// 未滚动到底部
		if (( this.listRef.current.scrollHeight - this.listRef.current.clientHeight ) > this.listRef.current.scrollTop) {
				//未到底
		} else {
      //已到底部
      console.log('到底了')
      onEndReached && onEndReached();
		}
	};

  render() {
    const { className, style, children } = this.props;

    return (
      <div
        className={className}
        style={style}
        ref={this.listRef}
        onScroll={() => this._onScroll()}
      >
        {
          children
        }
      </div>
    );
  }
}

export default ListView;