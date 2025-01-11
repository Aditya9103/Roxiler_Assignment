import './App.css';
import React, { useState } from 'react';
import { Layout, Menu, Select } from 'antd';
import Transactions from './components/Transactions';
import Stats from './components/Stats';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const navItems = [
  {
    key: "1",
    label: <NavLink to="/">Transactions</NavLink>,
  },
  {
    key: "2",
    label: <NavLink to="/stats">Stats</NavLink>,
  },
];

const months = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const App = () => {
  const [month, setMonth] = useState(3);

  const handleMonthChange = (value) => setMonth(parseInt(value, 10));

  return (
    <BrowserRouter>
      <Layout>
        {/* Header Section */}
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ color: "white", margin: 0, fontSize: "20px" }}>Dashboard</h1>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={navItems}
            style={{
              flex: 1,
              marginLeft: "24px",
            }}
          />
          <Select
            size="large"
            value={month}
            onChange={handleMonthChange}
            style={{ width: 200 }}
            options={months.map((label, index) => ({ value: index, label }))}
          />
        </Header>

        {/* Content Section */}
        <Content
          style={{
            padding: "24px",
            backgroundColor: "#f0f2f5",
            minHeight: "calc(100vh - 134px)", // Account for header and footer height
          }}
        >
          <Routes>
            <Route
              path="/"
              element={<Transactions month={month} monthText={months[month]} />}
            />
            <Route
              path="/stats"
              element={<Stats month={month} monthText={months[month]} />}
            />
          </Routes>
        </Content>

        {/* Footer Section */}
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#001529",
            color: "white",
          }}
        >
          Created by <strong>Aditya Kumar Singh</strong>
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
