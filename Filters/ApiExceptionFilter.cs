using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace CoreMenu
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            ApiError apiError = null;
            if (context.Exception is ApiException)
            {
                // handle explicit 'known' API errors
                var ex = context.Exception as ApiException;
                context.Exception = null;
                apiError = new ApiError(ex.Message);
                apiError.errors = ex.Errors;

                context.HttpContext.Response.StatusCode = ex.StatusCode;
            }
            else if (context.Exception is UnauthorizedAccessException)
            {
                apiError = new ApiError("Unauthorized Access");
                context.HttpContext.Response.StatusCode = 401;
            }
            else
            {
                #if !DEBUG
                    var msg = "An unhandled error occurred.";                
                    string stack = null;
                #else
                    var msg = context.Exception.GetBaseException().Message;
                    string stack = context.Exception.StackTrace;
                #endif

                apiError = new ApiError(msg);
                apiError.detail = stack;
                context.HttpContext.Response.StatusCode = 500;
            }
            context.Result = new JsonResult(apiError);
            base.OnException(context);
        }
    }

    public class ApiException : Exception
    {
        public int StatusCode { get; set; }

        public List<String> Errors { get; set; }

        public ApiException(string message, int statusCode = 500, List<String> errors = null) : base(message)
        {
            StatusCode = statusCode;
            Errors = errors;
        }
        public ApiException(Exception ex, int statusCode = 500) : base(ex.Message)
        {
            StatusCode = statusCode;
        }
    }

    public class ApiError
    {
        public string text { get; set; }
        public bool isError { get; set; }
        public string detail { get; set; }
        public List<String> errors { get; set; }

        public ApiError(string message)
        {
            this.text = message;
            isError = true;
        }
    }
}

