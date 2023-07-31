import React, { useCallback } from 'react';

import { Button, Typography } from '@douyinfe/semi-ui';

import { Seo } from 'components/seo';
import { toLogin, useUser } from 'data/user';
import { TeamWorkIllustration } from 'illustrations/team-work';
import { SingleColumnLayout } from 'layouts/single-column';
import type { NextPage } from 'next';
import Router from 'next/router';

import styles from './index.module.scss';

const { Title, Paragraph } = Typography;

const Page: NextPage = () => {
  const { user } = useUser();

  const start = useCallback(() => {
    if (user) {
      Router.push(`/app`);
    } else {
      toLogin();
    }
  }, [user]);

  const toShowDoc = useCallback(() => {
    window.open('http://58.56.207.43:5035/web/#/item/index');
  }, []);

  
  const toGithub = useCallback(() => {
    window.open('http://58.56.209.230:5051');
  }, []);

  

  return (
    <SingleColumnLayout>
      <Seo title="主页" />
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.content}>
            <div>
              <div>
                <Title style={{ marginBottom: 12 }}>四维知识库</Title>
                <Paragraph type="tertiary">
                  好好学习，天天向上
                </Paragraph>
              </div>
              <div style={{ margin: '32px 0' }}>
                <Button theme="solid" onClick={start}>
                  开始使用
                </Button>
                <Button style={{ marginLeft: 12 }} onClick={toGithub}>
                  私有Gitlab
                </Button>
                <Button style={{ marginLeft: 12 }} onClick={toShowDoc}>
                  私有Showdoc
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.hero}>
            <TeamWorkIllustration />
          </div>
        </div>
      </div>
    </SingleColumnLayout>
  );
};

export default Page;
