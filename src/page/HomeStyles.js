import styled from '@emotion/styled';

export const Container = styled.div`
  /* Flex-items are stretched in cross axios (from left to right) */
  display: flex;
  flex-direction: column;

  background-color: ${(props) => (props.backgroundColor ? 'var(--color-gray-01)' : 'transparent')};
`;

export const HeroHeading = styled.h1`
  margin-bottom: var(--space-12);
  font-size: var(--heading-2xl-font-size);
  line-height: 1.2;
  letter-spacing: 2px;
`;

export const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: var(--space-48);
  padding-bottom: var(--space-48);
  padding-left: var(--space-8);
  padding-right: var(--space-8);
  text-align: center;

  @media (min-width: 320px) {
    padding-left: var(--space-16);
    padding-right: var(--space-16);
  }

  @media (min-width: 375px) {
    padding-left: var(--space-32);
    padding-right: var(--space-32);
  }

  @media (min-width: 768px) {
    flex-direction: ${(props) => (props.reverse ? 'row-reverse' : 'row')};
    text-align: left;
    align-items: center;
    justify-content: space-between;
    padding-left: var(--space-48);
    padding-right: var(--space-48);
  }

  @media (min-width: 1120px) {
    /* Avoid width being affected by automatic margins */ 
    /* becomeing smaller */
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
  }
`;

export const HeroSection = styled(Section)`

  @media (min-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const HeroWrapper = styled.div`
  /* the priority order on the z-axios copmared to normal elements */
  position: relative;

  @media (min-width: 540px) {
    margin-bottom: var(--negative-space-15);
  }

  @media (min-width: 648px) {
    margin-bottom: var(--negative-space-25);
  }

  @media (min-width: 848px) {
    margin-bottom: var(--negative-space-35);
  }
  
  @media (min-width: 1120px) {
    margin-bottom: var(--negative-space-45);
  }
`;

export const FeatureHeading = styled.h2`
  margin-bottom: var(--space-12);
  font-size: var(--heading-lg-font-size);
`;

export const FeatureDetail = styled.p`
  font-size: 1.7rem;
  margin-bottom: var(--space-32);
`;

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => (props.hasJoinBtn ? 'var(--space-32)' : '0')};

  @media (min-width: 768px) {
    margin-bottom: ${(props) => props.hasJoinBtn && '0'};
  }
`;
