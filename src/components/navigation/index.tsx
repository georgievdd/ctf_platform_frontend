import * as React from 'react';
import { styled } from '@mui/system';
import { buttonClasses } from '@mui/base/Button';
import { Tabs } from '@mui/base/Tabs';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { useTheme } from '../../theme';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ILink} from "../header";
import {useEffect, useState} from "react";
import {prepareLinks} from "../../datafunc";

export default function NavLinks({ links }: { links: ILink[] }) {

  const currentSelect = prepareLinks(links);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname)
  }, [pathname]);

  const { colors } = useTheme();
  const navigate = useNavigate();
  const Tab = styled(BaseTab)`
    color: ${colors.primary.DEFAULT};
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 12px;
    margin: 6px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: ${colors.primary[600]};
    }

    &:focus {
      color: ${colors.primary[100]};
      outline: 3px solid ${colors.primary[400]};
    }

    &.${tabClasses.selected} {
      background-color: ${colors.primary[300]};
      color: ${colors.secondary.DEFAULT};
    }

    &.${buttonClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  const TabsList = styled(BaseTabsList)(
    ({ theme }) => `
    min-width: 400px;
    background-color: ${colors.secondary.DEFAULT};
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? '#1C2025' : '#B0B8C4'};
    `,
  );

  const getChecked = () => {
    try {
      return currentSelect[pathname].index;
    } catch {
      return -1;
    }
  }

  return (
    <div>
      <Tabs
        defaultValue={getChecked()}
        selectionFollowsFocus
        onChange={e => {
          e?.preventDefault();
          navigate((e!.target as HTMLElement).id);
        }}
      >
        <TabsList>
          {links.map(({name, to}, idx) => (
              <Tab id={to} key={name}>{name}</Tab>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}