import { Link } from "@tanstack/react-router";
import { PropsWithChildren } from "react";

interface HeaderProps {
  leftButton?: React.ReactNode;
  title?: string;
  rightButton?: React.ReactNode;
}

export const Header = (props: HeaderProps) => {
  return (
    <div className="bg-white flex h-16">
      {props.leftButton !== undefined && (
        <div className="flex-shrink">{props.leftButton}</div>
      )}
      <HeaderTitle>{props.title}</HeaderTitle>
      {props.rightButton !== undefined && (
        <div className="flex-shrink">{props.rightButton}</div>
      )}
    </div>
  );
};

export const HeaderTitle = (props: PropsWithChildren) => {
  return (
    <div className="flex-grow px-4 font-bold text-2xl flex items-center justify-start">
      {props.children}
    </div>
  );
};

interface HeaderBackLinkProps {
  label: React.ReactNode;
  to: string;
}

export const HeaderBackLink = (props: HeaderBackLinkProps) => {
  return (
    <Link to={props.to}>
      <div className="hover:bg-slate-200 w-full h-full px-4 flex items-center justify-center">
        {props.label}
      </div>
    </Link>
  );
};
