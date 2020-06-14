import React, { Component } from 'react';
import ConditionBar from '../../components/ConditionBar';
import ListPageData from '../../components/ListPageData';

class GoodsList extends Component {

  render() {

    return (
      <div className="goods-list-container">
        <ConditionBar />

        <ListPageData
          url="/search/searchProdPage"
          params={{
            prodName: '',
          }}
        />
      </div>
    );
  }
}

export default GoodsList;