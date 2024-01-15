import styled from "styled-components";

interface EmptyStateProps {
  title: string;
  sub_title: string;
}

const EmptyState = ({ title, sub_title }: EmptyStateProps) => {
  return (
    <EmptyContent>
      <img src="/base_bee.png" alt="empty-myHoney-image" width={"120px"} />
      <div className="pt-3">{title}</div>
      <div>{sub_title}</div>
    </EmptyContent>
  );
};

export default EmptyState;

const EmptyContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: #fff78a;
`;
