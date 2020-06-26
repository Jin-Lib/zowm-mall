import React, { useEffect } from 'react';
import { Toast } from 'antd-mobile'

function Loading() {
    Toast.loading('正在努力加载中...', 0)

    useEffect(() => {
        return () => {
            Toast.hide()
        }
    }, [])

    return null
}

export default Loading;