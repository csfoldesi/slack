import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, HashIcon, Loader, MessageSquareTextIcon, SendHorizonalIcon } from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { WorkspaceSection } from "./workspace-section";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
  const { data: channels } = useGetChannels({ workspaceId });

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex felx-col bg-[#5e2c5f] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex felx-col bg-[#5e2c5f] h-full items-center justify-center gap-y-2">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5e2c5f] h-full">
      <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareTextIcon} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonalIcon} id="drafts" />
      </div>
      <WorkspaceSection label="channels" hint="New channel" onNew={() => {}}>
        {channels?.map((item) => <SidebarItem label={item.name} icon={HashIcon} id={item._id} key={item._id} />)}
      </WorkspaceSection>
    </div>
  );
};
