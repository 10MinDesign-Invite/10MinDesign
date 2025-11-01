"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Plus, PlusSquare, Trash2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { toast } from "react-toastify";

interface Field {
  label: string;
  value: string;
  isLarge?: boolean;
}

export default function DynamicFields() {
  const [componentId, setComponentId] = useState("");
  const [fields, setFields] = useState<Field[]>([{ label: "", value: "" }]);
  const [category, setCategory] = useState("")


  const addField = (isLarge = false) => {
    setFields((prev) => [...prev, { label: "", value: "", isLarge }]);
  };

  const removeField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    key: keyof Field,
    value: string
  ): void => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [key]: value } : f))
    );
  };

  const handleSubmit = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_Backend_URL}/template/add`,
      { templateId:componentId, templateData: JSON.stringify(fields), category },
      { withCredentials: true }
    );

    if(res.status === 200){
      toast.success("template added successfully...")
    }
  };

  const handleUpdate = async () => {
    const update = await axios.put(`${process.env.NEXT_PUBLIC_Backend_URL}/template/update`,{templateId:componentId,templateData:JSON.stringify(fields),category},{withCredentials:true})
    if(update.status === 200){
      toast.success("template update success...")
    }else{
      toast.success("operation fail...")
    }
  }
  const handleDelete = async () => {
    const update = await axios.put(`${process.env.NEXT_PUBLIC_Backend_URL}/template/delete`,{templateId:componentId,category},{withCredentials:true})
    if(update.status === 200){
      toast.success("template deletion success...")
    }else{
      toast.success("operation fail...")
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 overflow-x-hidden ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold"> Add Template Info </h2>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={() => addField(false)}>
            <Plus className="w-4 h-4 mr-2" /> Add Field
          </Button>
          <Button variant="outline" onClick={() => addField(true)}>
            <PlusSquare className="w-4 h-4 mr-2" /> Add Large Field
          </Button>
          <Button onClick={handleSubmit} className="w-full md:w-auto">
            Save Data
          </Button>
          <Button onClick={handleUpdate} className="w-full md:w-auto">
            Update
          </Button>
          <Button onClick={handleDelete} className="w-full md:w-auto">
            Delete
          </Button>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 ">
        {/* Form Section */}
        <div className="space-y-4 h-[600px] overflow-x-hidden">
          {/* Component ID */}
          <div className="w-[98%] mx-auto">
            <Label>Component ID</Label>
            <Input
              className=""
              value={componentId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setComponentId(e.target.value)
              }
              placeholder="Enter component id"
            />
          </div>

          <div className="flex flex-col relative">
            <Label>Category</Label>
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Template Category</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px] bg-black p-3 rounded-md border">
                <DropdownMenuLabel className="text-green-300 font-bold">Template Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={category}
                  onValueChange={setCategory}
                >
                  <DropdownMenuRadioItem className="mt-2 text-white ml-3 hover:font-bold transition-all duration-200 cursor-pointer hover:pl-2" value="wedding">
                    wedding
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="mt-2 text-white ml-3 hover:font-bold transition-all duration-200 cursor-pointer hover:pl-2" value="birthday">
                    birthday
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="mt-2 text-white ml-3 hover:font-bold transition-all duration-200 cursor-pointer hover:pl-2" value="rip">
                    rip
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="mt-2 text-white ml-3 hover:font-bold transition-all duration-200 cursor-pointer hover:pl-2" value="opening">
                    opening
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="mt-2 text-white ml-3 hover:font-bold transition-all duration-200 cursor-pointer hover:pl-2" value="festival">
                    festival
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Dynamic Fields */}
          {fields.map((field, index) => (
            <div
              key={index}
              className={`p-4 border rounded-xl bg-muted/40 shadow-sm transition-all hover:bg-muted/60 grid gap-3 ${
                field.isLarge
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-[1fr_1fr_auto]"
              } items-end`}
            >
              <div>
                <Label>Label</Label>
                <Input
                  value={field.label}
                  onChange={(e) => updateField(index, "label", e.target.value)}
                  placeholder="e.g. name"
                />
              </div>

              <div>
                <Label>Value</Label>
                {field.isLarge ? (
                  <Textarea
                    value={field.value}
                    onChange={(e) =>
                      updateField(index, "value", e.target.value)
                    }
                    placeholder="Enter large Info..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <Input
                    value={field.value}
                    onChange={(e) =>
                      updateField(index, "value", e.target.value)
                    }
                    placeholder="e.g. some name"
                  />
                )}
              </div>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeField(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Preview Section */}
        <div className="bg-gray-50 dark:bg-zinc-900 border rounded-xl p-5 shadow-inner">
          <h3 className="text-lg font-semibold mb-3">Preview</h3>
          {fields.filter((f) => f.label.trim()).length === 0 ? (
            <p className="text-gray-500 text-sm">No fields added yet.</p>
          ) : (
            <ul className="space-y-3 whitespace-pre-wrap break-words">
              {fields.map(
                (f, i) =>
                  f.label.trim() && (
                    <li
                      key={i}
                      className="flex items-start gap-3 border-b pb-2 last:border-none"
                    >
                      <span className="w-3 h-3 mt-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex-shrink-0"></span>
                      <div>
                        <span className="font-medium">{f.label}: </span>
                        <span className="text-gray-600 break-words">
                          {f.value}
                        </span>
                      </div>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
