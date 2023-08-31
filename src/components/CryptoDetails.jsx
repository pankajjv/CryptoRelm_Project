import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Typography, Select } from 'antd';
import { useEffect } from 'react';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptosDetailQuery } from '../services/cryptoApi';
import { Title } from 'chart.js';
const CryptoDetails = () => {
  const { Option } = Select
  const { Title, Text } = Typography

  const { coinId } = useParams();
  const [timeperiod, setTime] = useState('')

  const { data, isFetching } = useGetCryptosDetailQuery(coinId)
  if(isFetching) return 'loading'
  console.log(data);
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const cryptoDetails = data?.data?.coin;

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];


  return (

    
    <div className='coindetails-container'>
        <div className='coindetails-heading'>
        <Typography.Title level={2} className='coin-name' style={{ color: 'rgb(39, 108, 168)', fontWeight: '800' }}>
          {cryptoDetails.name} ({cryptoDetails?.symbol})
        </Typography.Title>
        <p>{cryptoDetails.name} live price in US dollar. View value statistics, market cap and supply.</p>

      </div>
      


      <div className='stats-container'>
        <div className='stats-Details'>
          <div className='stats-Heading'>
            <Title level={3}>{cryptoDetails?.name} Value Statistics</Title>
            <p style={{ marginBottom: '20px' }}>An overview showing the stats of Bitcoin</p>
          </div>

          {
            stats.map((stat) => (
              <div className='coin-stats'>
                <div className='coin-stats-name'>
                  <Text>{stat.icon}</Text>
                  <Text>{stat.title}</Text>
                </div>
                <Text>{stat.value}</Text>
              </div>
            ))
          }



        </div>

        <div className='stats-Details'>
          <div className='stats-Heading'>
            <Title level={3}>Other Statistics</Title>
            <p style={{ marginBottom: '20px' }}>An overview showing the stats of all cryptocurrencies</p>
          </div>

          {
            genericStats.map((stat) => (
              <div className='coin-stats'>
                <div className='coin-stats-name'>
                  <Text>{stat.icon}</Text>
                  <Text>{stat.title}</Text>
                </div>
                <Text>{stat.value}</Text>
              </div>
            ))
          }



        </div>
      </div>



      <div className='coin-box'>

        <div className='coin-description'>
          <Title level={3} className='coin-details-heading' style={{ fontSize: '18px' }}>
            What is {cryptoDetails.name}? <br />
            {cryptoDetails.description}
          </Title>
        </div>

        <div className='links-container' style={{ marginTop: '30px' }}>
          <Title level={1}>
            {cryptoDetails.name} Links
          </Title>
          {
            cryptoDetails.links.map((link) => (
              <div className='coin-links'>
                <Title level={3}>{link.type}</Title>
                <a href={link.url} target='__blank' style={{fontSize: '18px', color: 'rgb(39, 108, 168)', fontWeight: '600'}}>{link?.name}</a>
              </div>

            ))
          }
        </div>
      </div>
    </div>
  )
}

export default CryptoDetails
