import { createElement } from '../createElement';
import { router } from '../router';

export const renderPagination = (wrapperPagination, page, pages, count) => {
  wrapperPagination.textContent = '';

  if (pages > count) {
    createElement(
      'a',
      {
        className: `pagination__arrow pagination__arrow_start
          ${!isNotStart ? 'pagination__arrow_disabled' : ''}`,
        href: `${router.getCurrentLocation().url}?page=${1}`,
        ariaLabel: 'В начало',
      },
      {
        parent: wrapperPagination,
      }
    )
  }

  const listPagination = createElement(
    'ul',
    {
      className: 'pagination__list',
    },
    {
      parent: wrapperPagination,
    }
  );

  const isNotStart = page - Math.floor(count / 2) > 1;
  const isEnd = page + Math.floor(count / 2) > pages;

  if (count > pages) {
    count = pages;
  }

  for (let i = 0; i < count; i++) {
    let n = i + 1;

    if (isNotStart) {
      if (isEnd) {
        n = pages - count + i + 1;
      } else {
        n = page - Math.floor(count / 2) + i;
      }
    }

    createElement(
      'li',
      {
        className: 'pagination__item',
      },
      {
        parent: listPagination,
        append: createElement(
          'a',
          {
            textContent: n,
            href: `${router.getCurrentLocation().url}?page=${n}`,
            className: `pagination__link
              ${page === n ? 'pagination__link_active' : ''}`
          }
        )
      }
    )
  }

  if (pages > count) {
    createElement(
      'a',
      {
        className: `pagination__arrow pagination__arrow_end
          ${isEnd ? 'pagnation__arrow_disabled' : ''}`,
        href: `${router.getCurrentLocation().url}?page=${pages}`,
        ariaLabel: 'В конец',
      },
      {
        parent: wrapperPagination,
      }
    )
  }
};