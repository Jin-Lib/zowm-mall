import React, { Component } from 'react';

class ListView extends Component {
  constructor(props) {
		super(props);
		this.listRef = React.createRef();
  }

  componentDidMount() {
    this.listRef.current.addEventListener('scroll', this._onScroll, true)
    // console.log(this.listRef.current.scrollHeight, this.listRef.current.clientHeight)
  }

  componentWillUnmount() {
    this.listRef.current.removeEventListener('scroll', this._onScroll)
  }
  
  _onScroll = () => {
    const { onEndReached } = this.props;
		// 未滚动到底部
		if (( this.listRef.current.scrollHeight - this.listRef.current.clientHeight ) > this.listRef.current.scrollTop) {
				//未到底
		} else {
      //已到底部
      onEndReached && onEndReached();
		}
	};

  render() {
    const { className, children } = this.props;

    return (
      <div
        className={className}
        style={{ overflow: 'auto' }}
        ref={this.listRef}
      >
        {
          children
        }
      </div>
    );
  }
}

export default ListView;