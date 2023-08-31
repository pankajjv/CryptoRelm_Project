import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Typography, Input, Select } from 'antd'
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import millify from 'millify'
import moment from 'moment'
const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews} = useGetCryptosNewsQuery({newsCategory, count: simplified ? 6 : 12})
  const{data} = useGetCryptosQuery(100)
  const {Option} = Select
  console.log(cryptoNews)
  const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
  return (
    

    <Row gutter={[24,24]}>
    {
      !simplified && (
        <Col span={24}>
          <Select placeholder='select crypto'
          className='select-news'
          onChange={(value)=> setNewsCategory(value)}
          >
            <Option >Cryptocurrency</Option>
            {data?.data?.coins.map((coin)=>(
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )
    }
      {
        cryptoNews?.value.map((news, i)=> (
          <Col lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank'>
                <div className='news-image-container'>
                  <Typography.Title level={4} className='news-title'>
                    {news.name}
                  </Typography.Title>
                  <img src={news?.image?.thumbnail?.contentUrl} alt='news' />
                </div>
                <p>{news.description > 20 ? `${news.description.substring(0,20)}...` : news.description}</p>

                <div className='provider-container'>
                  <div className='about-provider'>
                    <img src={news?.provider[0]?.image?.thumbnail?.contentUrl ||  demoImage}  alt='news-provider' />
                    <p className='provider-name'>{news?.provider[0]?.name}</p>
                  </div>
                  <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
                </div>
              </a>

            </Card>
          </Col>
        ))
      }
    </Row>

  )
}

export default News
