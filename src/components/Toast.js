import React, { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../redux/actions/userActions";

const Toast = () => {
    const dispatch = useDispatch();
    const toast = useSelector((state) => state.auth.toast);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast, dispatch]);

    return (
        <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => dispatch(hideToast())} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
            {toast && <Alert onClose={() => dispatch(hideToast())} severity={toast.severity}>{toast.message}</Alert>}
        </Snackbar>
    );
};

export default Toast;