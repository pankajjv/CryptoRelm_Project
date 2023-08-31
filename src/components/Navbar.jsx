import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button, Typography, Avatar } from 'antd'
import { HomeOutlined, FundOutlined, MoneyCollectOutlined, BulbOutlined } from '@ant-design/icons'
import icon from '../images/cryptocurrency.png'
const Navbar = () => {
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large'/>
        <Typography.Title level={2} className='logo'>
            <Link to='/'>CryptoRelm</Link>
        </Typography.Title>
      </div>

    <Menu theme='dark'>
        <Menu.Item icon={<HomeOutlined/>}>
            <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined/>}>
            <Link to='/cryptocurrencies'>CryptoCurrencies</Link>
        </Menu.Item>
        
        <Menu.Item icon={<BulbOutlined/>}>
            <Link to='/news'>News</Link>
        </Menu.Item>
    </Menu>

    </div>
  )
}

export default Navbar
