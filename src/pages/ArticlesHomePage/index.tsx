import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';

import articles from '../../data/articles.json'

import './styles.css'
import { ArticleItem } from '../../components';

const ArticlesHomePage = () => {
    const navigate = useNavigate()

    const handleChangeSelectedArticle = (articleTitle: string) => {
        if (articleTitle) {
            navigate({
                pathname: '/articles',
                search: `?${createSearchParams({ title: articleTitle })}`,
            })
        }
    }
    return (
        <div className='articles-home-wrapper'>
            {
                articles.map(article => <ArticleItem onClick={() => handleChangeSelectedArticle(article.title)} article={article} />)
            }
        </div>
    )
}

export default ArticlesHomePage
