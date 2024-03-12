<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="print.aspx.cs" Inherits="Malldub.WebApi.print" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>
  <style>
    body {
      font-family: 'Open Sans', sans-serif;
    }

    h1, h2, h3, h4, h5, h6 {
    color: #585f69;
    margin-top: 5px;
    text-shadow: none;
    font-weight: normal;
    font-family: 'Open Sans', sans-serif;
    }

    a:link {
      text-decoration: underline;
    }

    a:visited {
      text-decoration: underline;
    }

    a:hover {
      text-decoration: underline;
    }

    a:active {
      text-decoration: underline;
    }

    .margin-top-30 {
      margin-top: 30px;  
    }

    .fundPrint {
      margin: auto;
      width: 800px;
      height: 1010px;
      background: #fff;
      border: solid 3px #e5e5e5;
    }

    .bgBorder {
      margin: 5px 5px 5px;
      height: 990px;
      width: 780px;
      border: solid 6px #e5e5e5;
    }

    .hrSupport {
      color: #A9A9A9
    }
    .tableFooter {
      width: 100%;
    }

    .imgBig {
      width: 380px;
      height: 340px;
    }
  </style>
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />
</head>
<body>
  <div class="fundPrint">
    <div class="bgBorder">
      <div class="row">
        <div class="col-md-12 text-center">
          <img src="/Content/img/851.png" width="700"/>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-12 text-center">
          <img class="imgBig" src="<%=DefaultImageName %>"/>
        </div>
      </div>

      <!-- Title -->
      <div class="row">
        <div class="col-md-12 text-center">
          <h1><%:FundTitle %></h1>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 text-center">
          <h1 class="hrSupport">Show your support by following the link below</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 text-center">
          <h1>
            <a href="<%:Permalink %>"><%:Permalink %></a>
          </h1>
        </div>
      </div>
      
      
      <table class="tableFooter">
        <tr>
          <td class="text-center"><img src="<%=QrCodeImage %>"/></td>
          <td class="text-center"><h3>Use your phone to connect to Us!</h3></td>
        </tr>
      </table>

    </div>
  </div>

  <script src="/Scripts/jquery-2.1.0.min.js"></script>
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
</body>
</html>
