import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading/LoadingComponent';
import styled from 'styled-components';
import ProfileAvatar from '../components/Images/profileAvatar.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50vh;
`;

const Wrapper = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Info = styled.div`
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Profile: React.FC = () => {
  const { fetchUser, user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      if (!user) {
        try {
          const data = await fetchUser();
          setUserData({
            ...data,
            createdAt: new Date(data.createdAt).toLocaleDateString(),
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData({
          ...user,
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        });
      }
    };

    getUserData();
  }, [fetchUser, user]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <Container>
      <Wrapper>
        <img src={ProfileAvatar} alt='avatr'/>
        <Info>
          <strong>First Name:</strong> {userData.firstName}
        </Info>
        <Info>
          <strong>Email:</strong> {userData.email}
        </Info>
        <Info>
          <strong>Created At:</strong> {userData.createdAt}
        </Info>
        <StyledLink to="/logout">Log out</StyledLink>
      </Wrapper>
    </Container>
  );
};

export default Profile;
