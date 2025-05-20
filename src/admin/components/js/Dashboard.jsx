import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/dashboard.css';
import { useGetAnalyticsMutation } from '../../../apis/dashboardApi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [getAnalytics] = useGetAnalyticsMutation();
  const [analyticsData, setAnalyticsData] = useState({
    dates: [],
    users: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getAnalytics({
          startDate: '7daysAgo',
          endDate: 'today',
          metrics: ['activeUsers'],
          dimensions: ['date'],
        }).unwrap();

        const dates = response.data.map((item) => item.date);
        const users = response.data.map((item) => item.activeUsers);

        setAnalyticsData({
          dates,
          users,
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, [getAnalytics]);
  return (
    <div className="admin-main-content">
      <div className="admin-container-fluid">
        <h4>Dashboard / Tổng quan</h4>

        {/* Biểu đồ người dùng hoạt động */}
        <div className="row mt-3">
          <div className="col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Người dùng hoạt động trong 7 ngày qua</h5>
                <Line
                  data={{
                    labels: analyticsData.dates,
                    datasets: [
                      {
                        label: 'Người dùng hoạt động',
                        data: analyticsData.users,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Thống kê người dùng hoạt động',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Thống kê */}
        {/* <div className="row mt-3">
          {[
            { color: 'warning', text: 'Phim mới', count: 0 },
            { color: 'danger', text: 'Top phim có người xem nhiều', count: 0 },
            { color: 'primary', text: 'User mới/Tổng số user', count: '0/27' },
            { color: 'success', text: 'Số phiên truy cập', count: '0' },
          ].map((item, index) => (
            <div className="col-md-3" key={index}>
              <div className={`card bg-${item.color} text-white p-3`}>
                <h5>{item.count}</h5>
                <p>{item.text}</p>
                <button className="btn btn-light btn-sm">
                  Xem thêm <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
