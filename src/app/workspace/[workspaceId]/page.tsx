interface WorkspaceIdPage {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = ({ params }: WorkspaceIdPage) => {
  return <div>{params.workspaceId}</div>;
};

export default WorkspaceIdPage;
