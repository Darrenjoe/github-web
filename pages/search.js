import { useCallback, memo, useEffect } from "react";
import { withRouter } from "next/router";
import { Row, Col } from "antd";
import Link from "next/link";
import Router from "next/router";
import Repo from "../components/Repo";
import { cacheArray } from "../lib/repo-basic-cache";

const api = require("../lib/api");

const isServer = typeof window === "undefined";

const LANGUAGES = ["JavaScript", "HTML", "CSS", "TypeScript", "Java", "Rust"];
const SORT_TYPES = [
  {
    name: "Best Match"
  },
  {
    name: "Most Stars",
    value: "stars",
    order: "desc"
  },
  {
    name: "Fewest Stars",
    value: "stars",
    order: "asc"
  },
  {
    name: "Most Forks",
    value: "forks",
    order: "desc"
  },
  {
    name: "Fewest Forks",
    value: "forks",
    order: "asc"
  }
];

/**
 * sort: 排序方式
 * order: 排序顺序
 * lang: 仓库的项目开发主语言
 * page: 分页页面
 */
const selectedItemStyle = {
  borderLeft: "2px solid #e36209",
  fontWeight: 100
};

function noop() {}

const FilterLink = memo(({ name, query, lang, sort, order }) => {
  let queryString = `?query=${query}`;
  if (lang) queryString += `&lang:${lang}`;
  if (sort) queryString += `&sort=${sort}&order=${order || "desc"}`;

  return (
    <Link href={`/search${queryString}`}>
      <a>{name}</a>
    </Link>
  );
});

function Search({ router, repos }) {
  const { ...querys } = router.query;
  const { lang, sort, order, page } = router.query;

  useEffect(() => {
    if (!isServer) {
      cacheArray(repos.items);
    }
  });

  return (
    <div className="root">
      <Row gutter={20}>
        <Col span={6}>
          <div className="list">
            <p className="left-title">语言</p>
            <ul>
              {LANGUAGES.map((item, index) => {
                const selected = lang === item;
                return (
                  <li key={index} style={selected ? selectedItemStyle : null}>
                    {selected ? (
                      <span>{item}</span>
                    ) : (
                      <FilterLink {...querys} lang={item} name={item} />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="list">
            <p className="left-title">排序</p>
            <ul>
              {SORT_TYPES.map((item, index) => {
                let selected = false;
                if (item.name === "Best Match" && !sort) {
                  selected = true;
                } else if (item.value === sort && item.order === order) {
                  selected = true;
                }
                return (
                  <li key={index} style={selected ? selectedItemStyle : null}>
                    {selected ? (
                      <span>{item.name}</span>
                    ) : (
                      <FilterLink
                        {...querys}
                        sort={item.value}
                        order={item.order}
                        name={item.name}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
        <Col span={18}>
          <h3 className="repos-title">{repos.total_count} 个仓库</h3>
          {repos.items.map(repo => (
            <Repo repo={repo} key={repo.id} />
          ))}
        </Col>
      </Row>
      <style jsx>{`
        .root {
          padding: 20px 0;
        }
        .list-header {
          font-weight: 800;
          font-size: 16px;
        }
        .repos-title {
          border-bottom: 1px solid #eee;
          font-size: 24px;
          line-height: 50px;
        }
      `}</style>
    </div>
  );
}

Search.getInitialProps = async ({ ctx }) => {
  const { query, sort, lang, order, page } = ctx.query;

  if (!query) {
    return {
      repos: {
        total_count: 0
      }
    };
  }

  let queryString = `?q=${query}`;
  if (lang) queryString += `+language:${lang}`;
  if (sort) queryString += `&sort=${sort}&order=${order || "desc"}`;
  if (page) queryString += `&page=${page}`;

  const result = await api.request(
    {
      url: `/search/repositories${queryString}`
    },
    ctx.req,
    ctx.res
  );

  return {
    repos: result.data
  };
};

export default withRouter(Search);
