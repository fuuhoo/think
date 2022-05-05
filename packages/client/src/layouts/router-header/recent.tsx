import React from 'react';
import Link from 'next/link';
import { Typography, Space, Dropdown, Tabs, TabPane, Modal } from '@douyinfe/semi-ui';
import { IconChevronDown } from '@douyinfe/semi-icons';
import { useRecentDocuments } from 'data/document';
import { useToggle } from 'hooks/use-toggle';
import { Empty } from 'components/empty';
import { DataRender } from 'components/data-render';
import { LocaleTime } from 'components/locale-time';
import { DocumentStar } from 'components/document/star';
import { IconDocumentFill } from 'components/icons/IconDocumentFill';
import { Placeholder } from './placeholder';
import styles from './index.module.scss';

const { Text } = Typography;

export const RecentDocs = () => {
  const { data: recentDocs, loading, error } = useRecentDocuments();

  return (
    <Tabs type="line" size="small">
      <TabPane tab="文档" itemKey="docs">
        <DataRender
          loading={loading}
          loadingContent={<Placeholder />}
          error={error}
          normalContent={() => {
            return (
              <div className={styles.itemsWrap} style={{ margin: '0 -16px' }}>
                {recentDocs.length ? (
                  recentDocs.map((doc) => {
                    return (
                      <div className={styles.itemWrap} key={doc.id}>
                        <Link
                          href={{
                            pathname: '/wiki/[wikiId]/document/[documentId]',
                            query: {
                              wikiId: doc.wikiId,
                              documentId: doc.id,
                            },
                          }}
                        >
                          <a className={styles.item}>
                            <div className={styles.leftWrap}>
                              <IconDocumentFill style={{ marginRight: 12 }} />
                              <div>
                                <Text ellipsis={{ showTooltip: true }} style={{ width: 180 }}>
                                  {doc.title}
                                </Text>

                                <Text size="small" type="tertiary">
                                  创建者：
                                  {doc.createUser && doc.createUser.name} • <LocaleTime date={doc.updatedAt} timeago />
                                </Text>
                              </div>
                            </div>
                            <div className={styles.rightWrap}>
                              <DocumentStar documentId={doc.id} />
                            </div>
                          </a>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <Empty message="最近访问的文档会出现在此处" />
                )}
              </div>
            );
          }}
        />
      </TabPane>
    </Tabs>
  );
};

export const RecentModal = ({ visible, toggleVisible }) => {
  return (
    <Modal
      centered
      title="最近访问"
      visible={visible}
      footer={null}
      onCancel={toggleVisible}
      style={{ maxWidth: '96vw' }}
    >
      <div style={{ paddingBottom: 24 }}>
        <RecentDocs />
      </div>
    </Modal>
  );
};

export const RecentMobileTrigger = ({ toggleVisible }) => {
  return <span onClick={toggleVisible}>最近</span>;
};

export const Recent = () => {
  return (
    <span>
      <Dropdown
        trigger="click"
        spacing={16}
        content={
          <div style={{ width: 300, padding: '16px 16px 0' }}>
            <RecentDocs />
          </div>
        }
      >
        <span>
          <Space>
            最近
            <IconChevronDown />
          </Space>
        </span>
      </Dropdown>
    </span>
  );
};
