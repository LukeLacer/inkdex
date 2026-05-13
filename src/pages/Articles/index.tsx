import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';

import articles from '../../data/articles.json'
import { TabItem, TabWrapper } from '../../components';
import { getArticleFile } from '../../utils';

import './styles.css'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

type ArticleType = {
    title: string;
    fileName: string;
}

const Articles = () => {
    const [searchParams] = useSearchParams();
    const [selectedArticle, setSelectedArticle] = useState<ArticleType>({} as ArticleType)
    const [content, setContent] = useState<string|undefined>('')
    const navigate = useNavigate()

    useEffect(() => {
        const title = searchParams.get("title")
        if (!title) return
        const articleToSelect = articles.find(e => e.title === title) || {} as ArticleType
        setSelectedArticle(articleToSelect)
    }, [searchParams])

    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                getArticleFile(`./articles/${selectedArticle.fileName}`).then((file) => {
                    setContent(file)
                })
            } catch (error) {
                console.error('Fetch error:', error)
            }
        }
        if (selectedArticle.fileName)
            fetchArticleData()
    }, [selectedArticle])

    const handleChangeSelectedArticle = (article: ArticleType) => {
        const params = { title: article.title };

        if (article.title) {
            navigate({
                pathname: '/articles',
                search: `?${createSearchParams(params)}`,
            })
            setSelectedArticle(article)
        }
    }   
    
    return (
        <div className='articles-page-wrapper'>
            <TabWrapper>
                {
                    articles.map(art => {
                        return <TabItem key={art.title} selected={art.title === selectedArticle.title} onClick={() => handleChangeSelectedArticle(art)}>{art.title}</TabItem>
                    })
                }
            </TabWrapper>
            <div className='article-visualizer'>
                {content ? parse(content) : null}
            </div>
        </div>
    )
}

export default Articles
