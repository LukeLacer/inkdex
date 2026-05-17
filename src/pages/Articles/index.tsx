import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import articles from '../../data/articles.json'
import { Button } from '../../components';
import { getArticleFile } from '../../utils';
import ArticlesHomePage from '../ArticlesHomePage';
import { Article } from '../../types';

import './styles.css'

const Articles = () => {
    const [searchParams] = useSearchParams();
    const [selectedArticle, setSelectedArticle] = useState<Article>({} as Article)
    const [content, setContent] = useState<string|undefined>('')
    const navigate = useNavigate()

    useEffect(() => {
        const title = searchParams.get("title")
        if (!title) {
            setSelectedArticle({} as Article)
            setContent('')
            return
        }
        const articleToSelect = articles.find(e => e.title === title) || {} as Article
        setSelectedArticle(articleToSelect)
    }, [searchParams])

    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                getArticleFile(`./articles/${selectedArticle.fileName}.html`).then((file) => {
                    setContent(file)
                })
            } catch (error) {
                console.error('Fetch error:', error)
            }
        }
        if (selectedArticle.fileName)
            fetchArticleData()
    }, [selectedArticle])
    
    return (
        <div className='articles-page-wrapper'>
            { content && <Button className='go-back-to-articles' onClick={() => navigate('/articles')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
            }
            <div className='article-header'>
                {content && <img className='article-banner' src={`../img/articles_image/banner_${selectedArticle.fileName}.png`} />}
                <h1 className='article-title'>{selectedArticle.title}</h1>
            </div>
            {
                content ? <div className='article-visualizer'>{parse(content)}</div>
                : <ArticlesHomePage/>
            }
        </div>
    )
}

export default Articles
