import React, { useState } from "react";
import { ReactSortable, GroupOptions } from "react-sortablejs";
import mickey from '../../images/mickey_mouse.png';
import minnie from '../../images/minnie_mouse.png';
import goof from '../../images/goofy.jpg';
import donald from '../../images/donald_duck.png';
import clarabelle from '../../images/clarabelle.png';
import daisy from '../../images/daisy_duck.jpg';

interface ItemType {
  id: number;
  name: string;
}

const DragAndDropExample = () => {
  const [list1, setList1] = useState<ItemType[]>([
    { id: 1, name: mickey },
    { id: 2, name: minnie },
    { id: 3, name: goof },
    { id: 4, name: donald },
    { id: 5, name: clarabelle },
    { id: 6, name: daisy },
  ]);

  const [list2, setList2] = useState<ItemType[]>([]);

  const group: GroupOptions = { name: 'groupName', pull: 'clone' };

  return (
    <>
      <ReactSortable
        style={{width: '200px'}}
        list={list1}
        setList={setList1}
        group={{ ...group, put: false }}
        animation={200}
        delay={2}
      >
        {list1.map((item) => (
          <div style={{cursor: 'grab', margin: '10px', padding: '5px', border: '1px solid #ccc' }} key={item.id}>
            <img style={{maxWidth: '50px'}} src={item.name} alt="test" />
          </div>
        ))}
      </ReactSortable>
      <ReactSortable
        style={{width: '200px', minHeight: '200px', backgroundColor: '#f9f910'}}
        list={list2}
        setList={setList2}
        group={group}
        animation={200}
        delay={2}
        removeOnSpill={true}
      >
        {list2.map((item) => (
          <div style={{ cursor: 'grab', margin: '10px', padding: '5px', border: '1px solid #ccc' }} key={item.id}>
            <img style={{maxWidth: '50px'}} src={item.name} alt="test" />
          </div>
        ))}
      </ReactSortable>
    </>
  );
};

export default DragAndDropExample