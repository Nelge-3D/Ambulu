import { Hand,  NotebookPen, BookOpen, Hash } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
    title: "Salutations",
    url: "/Salutations",
    icon: Hand,
  },
  {
    title: "Vocabulaire",
    url: "/Vocabulaire",
    icon: BookOpen,
  },
  
  {
    title: "Nombres",
    url: "/carouselNombres",
    icon: Hash,
  },
  
  
  {
    title: "Exercices",
    url: "/exercices",
    icon: NotebookPen,
  },

]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                     <span style={{ color: "black", fontSize: "1.1rem", fontWeight: "bold" }}>
                         {item.title}
                     </span>

                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}