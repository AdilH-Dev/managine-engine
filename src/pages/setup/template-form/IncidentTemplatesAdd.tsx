import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

export default function IncidentTemplatesAdd() {
  const [sections, setSections] = useState([
    { id: "sec1", title: "Requester Details", fields: [] },
    { id: "sec2", title: "Destination", fields: [] },
    { id: "sec3", title: "Module", fields: [] },
  ]);

  const availableFields = [
    "Address","Analysis","CIs","Division","Email id","Employee ID","Employee Name","Employee Type",
    "Environment Impacted","Impact End Time","Impact Start Time","Issue","Last Updated Time","Post Incident Action",
    "Resolved Time","Role","Root Cause","Scheduled End Time","Scheduled Start Time","Service Category","Solution",
    "Type","Workaround","Zoho Meet"
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const [draggingField, setDraggingField] = useState(null);

  const addFieldToSection = (sectionId, label) => {
    setSections(prev =>
      prev.map(s =>
        s.id === sectionId
          ? { ...s, fields: [...s.fields, { id: label + Date.now(), label }] }
          : s
      )
    );
  };

  const addSection = () => {
    const id = "sec" + Date.now();
    setSections([...sections, { id, title: "Untitled section", fields: [] }]);
  };

  const handleSectionDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleFieldDragEnd = (sectionId, event) => {
    const { active, over } = event;
    if (!over) return;

    // Dragging from available fields
    if (active.data.current?.from === "available") {
      addFieldToSection(sectionId, active.id);
      setDraggingField(null);
      return;
    }

    // Reordering inside a section
    if (active.id !== over.id) {
      setSections(prev =>
        prev.map(s => {
          if (s.id === sectionId) {
            const oldIndex = s.fields.findIndex(f => f.id === active.id);
            const newIndex = s.fields.findIndex(f => f.id === over.id);
            return { ...s, fields: arrayMove(s.fields, oldIndex, newIndex) };
          }
          return s;
        })
      );
    }
    setDraggingField(null);
  };

  return (
    <div className="w-full h-full grid grid-cols-12 gap-4 p-4 bg-gray-100">

      {/* LEFT FORM AREA */}
      <div className="col-span-8 bg-white rounded border shadow-sm p-4 overflow-auto">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h1 className="text-xl font-semibold">New Incident Template</h1>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded text-sm">Preview</button>
            <button className="px-3 py-1 border rounded text-sm">Technician View</button>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleSectionDragEnd}
        >
          <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
            {sections.map(section => (
              <SortableItem key={section.id} id={section.id}>
                <div className="border rounded p-2 mb-3 bg-gray-50">
                  <input
                    value={section.title}
                    onChange={e => setSections(prev => prev.map(s => s.id === section.id ? { ...s, title: e.target.value } : s))}
                    className="text-lg font-semibold bg-transparent border-b mb-2 w-full focus:outline-none"
                  />

                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(e) => handleFieldDragEnd(section.id, e)}
                  >
                    <SortableContext items={section.fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                      <div className="grid grid-cols-2 gap-2">
                        {section.fields.length === 0 && (
                          <div className="col-span-2 text-center text-gray-400 py-6 border border-dashed rounded">
                            Drop your field here
                          </div>
                        )}
                        {section.fields.map(field => (
                          <SortableItem key={field.id} id={field.id}>
                            <div className="border rounded bg-white p-2">
                              <label className="font-medium text-sm">{field.label}</label>
                              <input className="mt-1 border p-1 w-full text-sm rounded focus:outline-none" />
                            </div>
                          </SortableItem>
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>

        <button onClick={addSection} className="px-3 py-2 bg-blue-600 text-white rounded text-sm">+ New section</button>

        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-1 border rounded text-sm">Cancel</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Save</button>
        </div>
      </div>

      {/* RIGHT AVAILABLE FIELDS - DRAG SOURCE ONLY */}
      <div className="col-span-4 bg-white rounded border shadow-sm p-4 h-full overflow-auto">
        <h2 className="text-lg font-semibold mb-2">Available Fields</h2>
        <input placeholder="Search Fields" className="border p-2 rounded w-full mb-2 text-sm" />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={() => setDraggingField(null)}
          onDragStart={(event) => setDraggingField(event.active)}
        >
          <div className="space-y-2">
            {availableFields.map(label => (
              <div
                key={label}
                className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                {...{
                  onMouseDown: () => setDraggingField({ id: label, data: { from: "available" } }),
                }}
              >
                <p className="font-medium text-sm">{label}</p>
              </div>
            ))}
          </div>

          <DragOverlay>
            {draggingField && (
              <div className="border rounded p-2 bg-white shadow">{draggingField.id}</div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
