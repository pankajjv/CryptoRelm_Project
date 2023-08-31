import React from 'react'
import { Typography, Col, Row, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import  millify from 'millify'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
const Homepage = () => {
  const{data, isFetching} = useGetCryptosQuery(10)
  console.log(data)
  if(isFetching) return 'Loading...'
  const GlobalStats = data?.data?.stats;
  return (
    <>
    <Typography.Title style={{padding: '10px 0 0 20px'}} level={2}>Global Cryptos Stats</Typography.Title>
    <Row style={{padding: '20px'}}>
      <Col span={12}><Statistic title='Total Cryptocurrencies' value={GlobalStats.total}/></Col>
      <Col span={12}><Statistic title='Total Exchanges' value={GlobalStats.totalExchanges}/></Col>
      <Col span={12}><Statistic title='Total Market Cap' value={millify(GlobalStats.totalMarketCap)}/></Col>
      <Col span={12}><Statistic title='Total 24h Volume' value={millify(GlobalStats.total24hVolume)}/></Col>
      <Col span={12}><Statistic title='Total Market' value={millify(GlobalStats.totalMarkets)}/></Col>
    </Row>


    <div className='home-heading-container'>
      <Typography.Title level={2}>Top 10 Global CryptoCurrencies</Typography.Title>
      <Typography.Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show more</Link></Typography.Title>
    </div>
    <Cryptocurrencies simplified/>

    <div className='home-heading-container'>
      <Typography.Title level={2}>Top 10 CryptoCurrencies News</Typography.Title>
      <Typography.Title level={3} className='show-more'><Link to='/news'>Show more</Link></Typography.Title>
    </div>
    <News simplified/>


    </>
  )
}

export default Homepage
