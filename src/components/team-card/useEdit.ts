import { useState } from "react";
import { IUseInputValue, useInput } from "../../hooks"
import { ITeam } from "../../interfaces/team";


export interface IUseEditTeam {
  title: IUseInputValue,
  info: IUseInputValue,
  contacts: IUseInputValue,
  preview: IUseInputValue,
  updateValues: (data: ITeam) => void,
  value: ITeam | null,
  dto: {},
}

export const useEditTeam = (data?: ITeam): IUseEditTeam => {
  const title = useInput('');
  const info = useInput('');
  const contacts = useInput('');
  const preview = useInput('');
  const [value, setValue] = useState<ITeam | null>(data || null);

  const updateValues = (data: ITeam) => {
    title.updateValue(data.title);
    info.updateValue(data.info);
    contacts.updateValue(data.contacts);
    preview.updateValue(data.preview);
    setValue(data);
  }

  return {
    title,
    info,
    contacts,
    preview,
    updateValues,
    value,
    dto: {
      title: title.value,
      info: info.value,
      contacts: contacts.value,
      preview: preview.value,
    }
  }
}