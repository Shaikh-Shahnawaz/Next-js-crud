"use client";
import axios from "axios";
import { Router ,useRouter} from "next/navigation";
import { Input } from "postcss";
import React, { useState, SyntheticEvent, useRef } from "react";
import AddEmployee from "../add-employee/page";
export default function EditEmployee(props) {
console.log("props in edit employee =>",props)

    return (
        <AddEmployee editForm={props.searchParams} />
    )

}