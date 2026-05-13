import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

import './styles.css'
import { getClass } from '../../utils'
import { ArticleType } from '../../types'

type ArticleItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { article: ArticleType }

const ArticleItem = (props: ArticleItemProps) => {
    const { className, article, style, ...otherProps } = props

    return <div style={{ backgroundImage: `url(../img/articles_image/banner_${article.fileName}.png` }} className={getClass(className, 'article-item-main')} {...otherProps}>
        <h1>{article.title}</h1>
    </div>
}

export default ArticleItem
