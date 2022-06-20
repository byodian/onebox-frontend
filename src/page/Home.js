import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/HomeHeader';
import Footer from '../components/Footer';
import { Button } from '../components/ButtonStyles';

import Hero from '../assets/svg/hero.svg';
import Placeholder from '../assets/svg/placeholder.png';
import Feature1 from '../assets/svg/feature_1.svg';
import Feature2 from '../assets/svg/feature_2.svg';
import Feature3 from '../assets/svg/feature_3.svg';
import FooterImgage from '../assets/svg/footer_1.svg';

import {
  Container,
  HeroWrapper,
  HeroSection,
  HeroHeading,
  FeatureDetail,
  FeatureHeading,
  ImgWrapper,
  Section
} from './HomeStyles';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <HeroSection>
            <HeroWrapper>
              <HeroHeading>将想法装进BOX</HeroHeading>
              <FeatureDetail>毫无压力 想记就记</FeatureDetail>
              <Button as={Link} to="/register">立刻加入</Button>
            </HeroWrapper>
            <div>
              <img src={Hero} alt="使用 onebox 想记就记"/>
              <img className="placeholder-img" src={Placeholder} alt="使用 onebox 想记就记"/>
            </div>
          </HeroSection>
        </Container>
        <Container backgroundColor>
          <Section>
            <div>
              <FeatureHeading>不分类别，随时记录</FeatureHeading>
              <FeatureDetail>告别分类整理的压力，尽情记录</FeatureDetail>
            </div>
            <ImgWrapper>
              <img src={Feature1} alt="使用 onebox 想记就记"/>
            </ImgWrapper>
          </Section>
        </Container>
        <Container>
          <Section reverse>
            <div>
              <FeatureHeading>回顾过去，轻松创意</FeatureHeading>
              <FeatureDetail>定期回顾，从中获取新的视角和想法</FeatureDetail>
            </div>
            <ImgWrapper reverse>
              <img src={Feature2} alt="使用 onebox 想记就记"/>
            </ImgWrapper>
          </Section>
        </Container>
        <Container backgroundColor>
          <Section>
            <div>
              <FeatureHeading>添加标签，方便查找</FeatureHeading>
              <FeatureDetail>通过自定义标签，快速查找笔记</FeatureDetail>
            </div>
            <ImgWrapper>
              <img src={Feature3} alt="使用 onebox 想记就记"/>
            </ImgWrapper>
          </Section>
        </Container>
        <Container>
          <Section>
            <ImgWrapper hasJoinBtn reverse>
              <img src={FooterImgage} alt="使用 onebox 想记就记"/>
            </ImgWrapper>
            <div className="text-align-center">
              <FeatureHeading>将所有想法装进BOX</FeatureHeading>
              <FeatureDetail>毫无压力，想记就记</FeatureDetail>
            </div>
            <div>
              <Button as={Link} to="/register">立刻加入</Button>
            </div>
          </Section>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Home;
