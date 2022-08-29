import { Button, Form, Input, message, Select, Spin } from 'antd';
import { marked } from 'marked';
import highlight from 'highlight.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import {
  adminAddArticle,
  adminAlterArticle,
  uploadImgFile,
} from 'src/api/blog';
import useGetTags from 'src/data/use-getTags';
import { useLocalStorage } from 'react-use';
import { debounce } from 'lodash-es';
import { useHistory } from 'react-router-dom';
import useGetArticle from 'src/data/use-getArticle';

import styles from './index.module.less';
import 'highlight.js/styles/default.css';

const { TextArea } = Input;

interface IProps {}

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true, //默认为true。 允许 Git Hub标准的markdown.
  breaks: false, //默认为false。 允许回车换行。该选项要求 gfm 为true。
  pedantic: false, //默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  sanitize: false, //对输出进行过滤（清理）
  smartLists: true,
  smartypants: false, //使用更为时髦的标点，比如在引用语法中加入破折号。
  highlight: function (code: any) {
    return highlight.highlightAuto(code).value;
  },
});

/** 默认数据 */
const defaultValue = {
  content: '',
  cover: '',
  desc: '',
  tags: [] as string[],
  title: '',
};

/** url的文章id */
const id = new URLSearchParams(window.location.search).get('id') || '';
/** 本地数据key */
const storageKey = `article_detail_${id}`;
/** 是否第一次 */
let firstSave = true;

const ArticleDetail = (props: IProps) => {
  const [markHTML, setMarkHTML] = useState('');
  const [uploadImgLoading, setUploadImgLoading] = useState(false);
  const [cover, setCover] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  // 本地数据
  const [storageInfo, setStorageInfo] = useLocalStorage(
    storageKey,
    defaultValue
  );

  const [form] = Form.useForm();

  // 获取tag列表
  const { data: tagList = [] } = useGetTags();

  // 获取修改列表
  const { data, isValidating } = useGetArticle(id);

  /** 获取渲染的markdown */
  const html = useMemo(() => marked(markHTML || ''), [markHTML]);

  // 提交表单
  const onFinish = useCallback(
    (values: any) => {
      const info = { ...data, ...values, cover, tags: values.tags.join(',') };
      setLoading(true);
      const Api = id ? adminAlterArticle : adminAddArticle;
      Api(info)
        .then(() => {
          // 提交成功后, 清除本地数据
          setStorageInfo(defaultValue);
          message.success('操作成功');
          history.push('/article');
        })
        .catch((err) => {
          message.warning(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [cover, data, history, setStorageInfo]
  );

  // 文章内容图片上传
  const uploadImg = useCallback((file: any) => {
    setUploadImgLoading(true);
    uploadImgFile({ file })
      .then((res) => {
        const item = res.data?.data?.[0];
        item &&
          setMarkHTML(
            (pre) =>
              pre +
              `![${item.wsName}](${process.env.REACT_APP_HOST}${item.url})`
          );
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        setUploadImgLoading(false);
      });
  }, []);

  // 封面上传
  const coverChange = useCallback((value) => {
    const file = value?.target?.files[0];
    uploadImgFile({ file })
      .then((res) => {
        const item = res.data?.data?.[0];
        const cover = `${process.env.REACT_APP_HOST}${item.url}`;
        setCover(cover);
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        setUploadImgLoading(false);
      });
  }, []);

  /** 表单改变储存本次值 */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formChange = useCallback(
    debounce(() => {
      const info = { ...form.getFieldsValue(), cover };
      setStorageInfo(info);
    }, 300),
    [setStorageInfo, form, cover]
  );

  const initValue = useCallback(
    (info: any) => {
      // 数据来后修改表单值显示
      form.setFieldsValue(info);
      info?.content && setMarkHTML(info.content);
      info?.cover && setCover(info.cover);
    },
    [form]
  );

  useEffect(() => {
    if (data) {
      const info = { ...data, tags: data.tags?.split(/,|，/) };
      // 数据来后修改表单值显示
      initValue(info);
    }
  }, [data, initValue]);

  // 初始获取本地的值
  useEffect(() => {
    if (firstSave) {
      firstSave = false;
      // 数据来后修改表单值显示
      initValue(storageInfo);
    }
  }, [initValue, storageInfo]);

  return (
    <>
      <h3>{id ? '编辑' : '新增'}文章</h3>
      <Spin spinning={loading || isValidating}>
        <div className={styles.formBox}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            // 新增文章改变值存储数据到本地
            onChange={id ? undefined : formChange}
          >
            <Form.Item label="标题" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="描述" name="desc" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="标签" name="tags" rules={[{ required: true }]}>
              <Select mode="multiple" allowClear>
                {tagList.map((item) => (
                  <Select.Option value={item.tag} key={item.tag}>
                    {item.tag}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="封面">
              <Input
                type="file"
                onChange={coverChange}
                placeholder="请选择或拖动图片"
              />
              {cover && <img src={cover} alt="" className={styles.cover} />}
            </Form.Item>

            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '填写内容' }]}
            >
              <Spin spinning={uploadImgLoading} tip="图片上传中">
                <div className={styles.markdown}>
                  <TextArea
                    value={markHTML}
                    className={styles.markdownContent}
                    rows={25}
                    onChange={(e) => {
                      setMarkHTML(e.target.value);
                    }}
                    onPaste={(e) => {
                      const items = e.clipboardData.items;
                      //@ts-ignore
                      console.log('eeeeee', e.target.selectionStart);
                      if (items?.[0].type.indexOf('image') > -1) {
                        const file = items[0].getAsFile()!;
                        uploadImg(file);
                      }
                    }}
                    onDrop={(e) => {
                      const file = e.dataTransfer.files[0];
                      if (file) {
                        uploadImg(file);
                      }
                    }}
                    onPressEnter={(e) => {
                      //@ts-ignore
                      setMarkHTML(e.target.value);
                    }}
                    placeholder="文章内容"
                  />
                  <div
                    className={clsx(styles.preview, 'hljs')}
                    dangerouslySetInnerHTML={{ __html: html || '内容预览' }}
                  />
                </div>
              </Spin>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {id ? '修改' : '发布'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </>
  );
};
export default ArticleDetail;
