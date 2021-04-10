$(document).ready(() => {
  axios
    .get("/bi-member")
    .then((response) => {
      const result = response.data;
      $("[id=total]").each((idx, item) => {
        $(item).text(result.data.summarytier[0].total_members);
      });
      $("[id=totalamount]").each((idx, item) => {
        $(item).text(result.data.summarytier[0].total_amount);
      });
      $("#tier_name").text(result.data.summarytier[0].tier_name);
      //   $("#totaltransaction").text(result.data.summary.totaltransaction);
      //   $("#totalpoint").text(result.data.summary.totaltransaction);
      //   $("#remainingpoint").text(result.data.summary.totaltransaction);
      //   $("#lifetimevalue").text(result.data.summary.totaltransaction);
      const idElement = [
        "lifetimevalue",
        "totaltransaction",
        "totalpoint",
        "remainingpoint",
      ];
      $("div.footer > p span").each((index, element) => {
        $(element).text(result.data.summary[idElement[index]]);
      });
      $.each(result.data.list, (idx, item) => {
        //  <p              class="">
        //  element|tag     attibute
        // # เรียก tag id="data", . เรียก tag class="data", tag = element eg. body,p, h1, div
        $("tbody#data").append(`
        <tr>
            <td>${item.customername}</td>
            <td>${item.customertier}</td>
            <td>${item.customerphone}</td>
            <td>${item.totalamount}</td>
            <td>${item.totaltransaction}</td>
            <td>${item.totalreward}</td>
            <td>${item.remainingpoint}</td>
        </tr>
        `);
      });
      $("#example").DataTable({
        pagingType: "full_numbers",
      });
    })
    .catch(console.log)
    .then(() => console.log("done"));

  //   const multipile = (first, second, callback) => {
  //     const returnValue = first * second;
  //     if (typeof callback == "function")
  //       callback(returnValue, {
  //         json: () => "this is json call = " + returnValue,
  //       });
  //   };
  //   multipile(5, 10, (req, res) => {
  //     console.log(`${res.json()} result.`);
  //   });
  $("#print-pdf").click(() => {
    var doc = new jsPDF();
    var elementHTML = $("#example").html();
    var specialElementHandlers = {
      "#elementH": function (element, renderer) {
        return true;
      },
    };
    doc.fromHTML(elementHTML, 15, 15, {
      width: 170,
      elementHandlers: specialElementHandlers,
    });

    // Save the PDF
    doc.save("sample-document.pdf");
  });
});
