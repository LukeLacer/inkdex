import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

import './styles.css'
import { getClass } from '../../utils'
import { ArticleType } from '../../types'

type ArticleItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { article: ArticleType }

const ArticleItem = (props: ArticleItemProps) => {
    const { className, article, ...otherProps } = props

    return <div className={getClass(className, 'article-item-main')} {...otherProps}>
        <div className='colored-banner'/>
        <h1>{article.title}</h1>
    </div>
}

export default ArticleItem
