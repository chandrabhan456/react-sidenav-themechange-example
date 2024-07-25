import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal,Delete1  } from ".";

import {
  PresenceBadgeStatus,
  Avatar,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from "@fluentui/react-components";

import { Field, Input } from "@fluentui/react-components";

import { FaSearch } from "react-icons/fa";
//import { TbArrowsDownUp } from "react-icons/tb";

import { HiLogout } from "react-icons/hi";
import { BiSortAlt2 } from "react-icons/bi";
import { HiLogin } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineChevronLeft } from "react-icons/hi";
//import { CiEdit } from "react-icons/ci";
import { RiEdit2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import "./searchbar.css";

import {
  ordersData,
  columns,
  contextMenuItems,
  ordersGrid,
  columns1,
} from "../data/dummy";

function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [InputText, setInputText] = useState("");
  const [selects, setSelects] = useState(8);
  const [sort, setSort] = useState({ keyToSort: "OrderID", direction: "asc" });
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletemodalOpen, setdeleteModalOpen] = useState({Open:false,data:""});
  const [editmodelOpen, seteditModalOpen] = useState("");
 function handleedit(e){
  
  console.log("HELLO",e)

 }
  function getproducts() {
    fetch("http://localhost:4001/orders")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
      //  alert("unable to get the data");
      });
  }
  const inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };
  useEffect(getproducts, []);
  const ordersData3 = ordersData;
  const recordsPerPage = selects;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records1 = ordersData3.filter((el) => {
    if (el === "") {
      return el;
    } else {
      return (
        el.CustomerName.toLowerCase().includes(InputText) ||
        el.OrderItems.toLowerCase().includes(InputText) ||
        el.Location.toLowerCase().includes(InputText)
      );
    }
  });
  const records = records1.slice(firstIndex, lastIndex);
  function hadleHeaderClick(column) {
    setSort({
      keyToSort: column.Key,
      direction: sort.direction === "asc" ? "desc" : "asc",
    });
  }

  function handleDataSort(records) {
    if (sort.direction === "asc") {
      return records.sort((a, b) =>
        a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1
      );
    } else {
      return records.sort((a, b) =>
        a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1
      );
    }
  }

  const npage = Math.ceil(records1.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div className="mt-0 h-screen bg-[#B6BBC4] dark:bg-[#1d2041]" >
      <div className="flex justify-between p-2 h-70 md:mx-0 relative w-full">
        <div className=" absolute inset-y-0 left-12 w-13 mt-7 justify-center">
          <div className=" mt-15 ">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg text-gray-400">Page</p>
                <div className="flex">
                  <p className="text-3xl font-extrabold tracking-tight text-black dark:text-white">
                    Orders
                  </p>
                  <button
                    onClick={() => {seteditModalOpen('');setModalOpen(true)}}
                    className="mt-2 ml-5 item-orange"
                    style={{ color: "orange" }}
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalOpen && (
          <Modal data={seteditModalOpen}
            closeModal={() => {
              setModalOpen(false);
            }}
          />
        )}
        <div className="flex absolute  right-20">
          <div className="input-wrapper bg-white dark:bg-[#2D325C]" >
            <FaSearch className="text-black dark:text-white "  />
            <Input className="text-black dark:text-white "  placeholder="search" onChange={inputHandler} />
          </div>
        </div>
      </div>

      <Table
        basic="very"
        arial-label="Default table"
        style={{
          width: "96%",
       
        }}
        // style={{ minWidth: "475px" }}
      >
        <TableHeader >
          <TableRow
           id='tableheader'
          // style={(modalOpen) ? {height:'55px'} : {}}
          style={{height:'55px'}} 
          className="bg-[#d0dde7] dark:bg-[#52529a] text-black dark:text-white"
          >
            {columns1.map((column) => (
              <TableHeaderCell key={column.Key} id='headercell' style={{ paddingLeft: "60px" }}>
                {column.label}
                { <BiSortAlt2
                  id="UpDown-icon"
                  className="text-[#d0dde7] dark:text-[#52529B]"
                  onClick={() => hadleHeaderClick(column)}
                /> }
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody >
          {handleDataSort(records)
            .filter((el) => {
              if (el === "") {
                return el;
              } else {
                return (
                  el.CustomerName.toLowerCase().includes(InputText) ||
                  el.OrderItems.toLowerCase().includes(InputText) ||
                  el.Location.toLowerCase().includes(InputText)
                );
              }
            })
            .map((item) => (
              <TableRow 

                key={item.OrderID}
               
              >
                <TableCell
                   className="bg-[#ffffff] dark:bg-[#352f6e] text-black dark:text-[#CAD5DF]"
                  style={{
                    
                    border: "1px solid black",
                    borderRightWidth:"0",
                    borderLeft:"none",
                    fontSize: "14pt",
                  
                  }}
                >
                  <TableCellLayout style={{ paddingLeft: "60px" }}>
                    {item.OrderID}
                  </TableCellLayout>
                </TableCell>
                <TableCell
                 className="bg-[#ffffff] dark:bg-[#352f6e] text-black dark:text-white"
                  style={{
                  
                    border: "1px solid black ",
                    borderRightWidth:"0",
                    borderLeft: "none",
                    fontSize: "14pt",
                  }}
                >
                  <TableCellLayout style={{ paddingLeft: "60px" }}>
                    <img
                      style={{ width: "100px", height: "60px" }}
                      src={item.ProductImage}
                    />
                  </TableCellLayout>
                </TableCell>
                <TableCell
                 className="bg-[#ffffff] dark:bg-[#352f6e] text-black dark:text-[#CAD5DF]"
                  style={{
                
                    border: "1px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    fontSize: "14pt",
                  }}
                >
                  <TableCellLayout style={{ paddingLeft: "60px" }}>
                    {item.CustomerName}
                  </TableCellLayout>
                </TableCell>
                <TableCell
                 className="bg-[#ffffff] dark:bg-[#352f6e] text-black dark:text-[#CAD5DF]"
                  style={{
                   
                    border: "1px solid black ",
                    borderLeft: "none",
                    borderRight: "none",
                    fontSize: "14pt",
                    alignItems:'baseline'
                  }}
                >
                  <TableCellLayout style={{ paddingLeft: "60px" }}>
                    {item.OrderItems}
                  </TableCellLayout>
                </TableCell>
                <TableCell
                 className="bg-[#ffffff] dark:bg-[#352f6e] text-black dark:text-[#CAD5DF]"
                  style={{
                   
                    border: "1px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    fontSize: "14pt",
                  }}
                >
                  <TableCellLayout style={{ paddingLeft: "60px" }}>
                    {item.TotalAmount}
                  </TableCellLayout>
                </TableCell>
                <TableCell
                 className="bg-[#ffffff] dark:bg-[#352f6e] text-black dark:text-[#CAD5DF]"
                  style={{
                    
                    border: "1px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    fontSize: "14pt",
                  }}
                >
                  <TableCellLayout style={{ paddingLeft: "60px" }}>
                    {item.Location}
                  </TableCellLayout>
                </TableCell>
                <TableCell
                 className="bg-[#ffffff] dark:bg-[#352f6e] text-black dark:text-[#9AAFC2]"
                  style={{
                    
                    border: "1px solid black",
                    borderLeft: "none",
                    borderRight:"none",
                    fontSize: "14pt",
                  
                   
                  }}
                >
                  <TableCellLayout >
                   <RiEdit2Line  id='editcell' style={{height:'25px',width:'25px'}}  onClick={() => {seteditModalOpen(item);setModalOpen(true)}}/>
                    <MdDelete id='deletecell' style={{height:'25px',width:'25px'}} onClick={() => setdeleteModalOpen({Open:true,data:item.OrderID}) }/>
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {modalOpen && (
          <Modal data={editmodelOpen}
          closeModal={() => {
            setModalOpen(false);
            
           
          }}
          
        />
        
        )}
        {console.log(deletemodalOpen.data)}
        {deletemodalOpen.Open && (<Delete1 data={deletemodalOpen.data} closeModal={() => {
            setdeleteModalOpen(false);
            
           
          }} />

        )}
      <div className="flex justify-between p-2  md:mx-0 relative w-full">
        <div className="flex ml-10">
          <div className="text-black dark:text-white">items per Page</div>
          <div className="ml-2">
            <select
              value={selects}
              onChange={(e) => setSelects(e.target.value)}
            >
              <option>8</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>
        </div>
        <div className="flex absolute  right-20 mt-2">
          <div className=" right-80 text-black dark:text-white">
            showing {currentPage}-{npage} of 8
          </div>
          <div className="flex ">
            <div className="ml-14 mt-1">
              <a href="#" className="text-black dark:text-white" onClick={lastPage}>
                <HiLogout />
              </a>
            </div>

            <div className="ml-5 mt-1">
              <a href="#" className="text-black dark:text-white" onClick={prePage}>
                <HiOutlineChevronLeft />
              </a>
            </div>

            <div className="ml-6 mt-1">
              <a href="#" className="text-black dark:text-white" onClick={nextPage}>
                <HiOutlineChevronRight />
              </a>
            </div>
            <div className="ml-5 mt-1">
              <a href="#" className="text-black dark:text-white" onClick={firstPage}>
                <HiLogin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function prePage() {
    if (currentPage != firstIndex + 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (ordersData3.length > lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
  function firstPage() {
    setCurrentPage(1);
  }
  function lastPage() {
    setCurrentPage(npage);
  }
}

export default Orders;
