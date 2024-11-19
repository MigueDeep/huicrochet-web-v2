import { useState, useEffect } from "react";
import Layout from "../../components/common/Layout";
import { BestSellingUserDate } from "../../components/dashboard/BestSellingUserDate";
import Incomes from "../../components/dashboard/Incomes";
import { LastSales } from "../../components/dashboard/LastSales";
import Views from "../../components/dashboard/Views";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const DashboardPage = () => {
  const initialComponents = [
    { id: "views" },
    { id: "bestSellingUserDate" },
    { id: "lastSales" },
    { id: "incomes" },
  ];

  const [components, setComponents] = useState(initialComponents);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("components", JSON.stringify(components));
  }, [components]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = components.findIndex((comp) => comp.id === active.id);
    const newIndex = components.findIndex((comp) => comp.id === over.id);

    if (oldIndex !== newIndex) {
      setComponents((prev) => arrayMove(prev, oldIndex, newIndex));
    }
    setActiveId(null);
  };

  const renderComponent = (id: string) => {
    switch (id) {
      case "views":
        return <Views />;
      case "bestSellingUserDate":
        return <BestSellingUserDate />;
      case "lastSales":
        return <LastSales />;
      case "incomes":
        return <Incomes />;
      default:
        return null;
    }
  };

  return (
    <Layout title="Dashboard">
      <div className="container-fluid" style={{ width: "100%" }}>
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div>
            {components.map((comp) => (
              <DraggableDroppable key={comp.id} id={comp.id}>
                {renderComponent(comp.id)}
              </DraggableDroppable>
            ))}
          </div>
        </DndContext>
      </div>
    </Layout>
  );
};
///holaa
const DraggableDroppable: React.FC<{
  id: string;
  children: React.ReactNode;
}> = ({ id, children }) => {
  const {
    setNodeRef: setDraggableRef,
    listeners,
    attributes,
    transform,
    isDragging,
  } = useDraggable({ id });

  const { setNodeRef: setDroppableRef } = useDroppable({ id });

  const style = {
    transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={(node) => {
        setDraggableRef(node);
        setDroppableRef(node);
      }}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default DashboardPage;
