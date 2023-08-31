import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card , Input} from 'antd'
import millify from 'millify'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { useState, useEffect } from 'react'


const Cryptocurrencies = ({simplified, searchComponent}) => {
  const count = simplified ? 10 : 50;
  const {data: coinList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([])


  const [search, setSearch] = useState('')
  const [searchedItem, setSearchedItem] = useState([])

  useEffect(() => {
    const filterData = coinList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(search.toLowerCase()))
    setCryptos(filterData)
  }, [ coinList, search])
  if(isFetching) return 'loading..'

  return (
    <>
    {
      !simplified && (
        <div className='search-crypto'>
        <Input placeholder='search' onChange={(e)=> setSearch(e.target.value)}/>

        </div>

      ) 
      }

  

      <Row gutter={[32, 32]}>
        {
          cryptos?.map((currency)=> (
            <Col lg={6} key={currency.id}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card title={`${currency.rank}.${currency.name}`}
                extra={<img src={currency.iconUrl} alt={currency.name} className='crypto-image'/>}
                hoverable
                >
                    <p>Price: {millify(currency.price)}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>Daily Change: {currency.change}%</p>

                </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default Cryptocurrencies
