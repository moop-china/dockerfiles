define([
    'jquery',
    'base/js/namespace',
    'base/js/events'
], function (
    $,
    Jupyter,
    events
) {
    "use strict";

        // $('#widget-submenu').parent().css(
        //     // 'display', 'none',
        //         {
        //         display: 'none',
        //     }
        // )
    //添加代码块的工具栏
    function getJupyterElement() {
        let codeCell = null;
        let textCell = null;

        let interval = setInterval(() => {

            codeCell = $('.code_cell');
            textCell = $('.text_cell');

            if (codeCell.length > 0 || textCell.length > 0) {

                clearInterval(interval);

                let html = `<div class="code-tools">
                    <div class='tool-container'>
                        <span class="markdown-btn" data-tooltip="markdown模式">Markdown</span>
                        <span class="code-btn" data-tooltip="代码模式">Code</span>
                    </div>
                    <div class='tool-container add-cell'>
                        <span class='move-cell-up' data-tooltip="向上移动">
                            <i class='fa fa-arrow-up'></i>
                        </span>
                        <span class='move-cell-down' data-tooltip="向下移动">
                            <i class='fa fa-arrow-down'></i>
                        </span>
                    </div>
                    <div class='tool-container delete-cell'>
                        <span class='delete-cell-btn' data-tooltip="删除">
                            <i class="fa fa-trash"></i>
                        </span>
                    </div>
                </div>`

                let addHtml = `
                <div class="add-tools" >
                 <div class=''>
                        <span class='add-cell-code' data-tooltip="向下添加Code">
                            <i class='fa fa-plus'> Code</i>
                        </span>
                        <span class='add-cell-markdown' data-tooltip="向下添加MarkDown">
                            <i class='fa fa-plus'> Markdown</i>
                        </span>
                    </div>

                </div>`

                let runCodeHtml = `<div class="run-code-btn">
                        <i class='fa fa-play'></i>
                    </div>`

                codeCell.each(function (element, index) {

                    if ($(this).find('.input').find('.run-code-btn').length <= 0) {
                        $(this).find('.input').append(runCodeHtml);
                    }

                    if ($(this).find('.code-tools').length <= 0) {
                        $(this).append(html);
                    }
                    if ($(this).find('.add-tools').length <= 0) {
                        $(this).append(addHtml);
                    }


                });

                textCell.each(function (element, index) {
                    if ($(this).find('.run-code-btn').length <= 0) {
                        $(this).append(runCodeHtml);
                    }

                    if ($(this).find('.code-tools').length <= 0) {
                        $(this).append(html);
                    }
                    if ($(this).find('.add-tools').length <= 0) {
                        $(this).append(addHtml);
                    }

                });
                //确保能获取到值后再调用
                runCode(html, runCodeHtml);
                addCell(html, runCodeHtml);
                deleteCell();
                changeType(html);
                addTooltip();
                showAddTools();
            }
        }, 300);

    }

    function showAddTools() {
        $('.text_cell .inner_cell').blur(function(){
            console.log('leave input')
        })

        $('.cell').on('mouseenter', function () {
            var a = this;
            $(this).find('.add-tools').css({
                opacity: 1,
            })
            $(this).find('.add-tools .add-cell-code')
                .off('click').on('click', function (e) {
                    e.stopPropagation();
                    $(a).click()
                    $('#insert_cell_below').click();
                    getJupyterElement();
                })
            $(this).find('.add-tools .add-cell-markdown')
                .off('click').on('click', function (e) {
                    e.stopPropagation();
                    $(a).click()
                    $('#insert_cell_below,#to_markdown').click();
                    getJupyterElement();
                })

        }).on('mouseleave', function () {

            $(this).find('.add-tools').css({
                opacity: 0,
            })

        })
    }

    function addTooltip() {

        $('.code-tools .tool-container span').on('mouseenter', function () {

            let tooltipTitle = $(this).data('tooltip');
            let html = `<div class='btn-tooltip'>${tooltipTitle}<div>`;
            $(this).append(html);

            let rightPx = $(this).find('.btn-tooltip').width() / 2 - $(this).width() / 2;

            $(this).find('.btn-tooltip').css({
                right: - rightPx + 'px',
            })

        }).on('mouseleave', function () {

            $(this).find('.btn-tooltip').remove();

        })
    }

    function addRunCodeBtn() {

        let downloadCode = `<div class="download-code">
            <i class="fa fa-download"></i>
        </div>`

        $('#modal_indicator').before(downloadCode);
    }

    window.onbeforeunload = function (e) {
        return false;
    }

    // addRunCodeBtn();
    getJupyterElement();

    // 添加代码执行按钮
    function runCode(codeCellHtml, runCodeHtml) {

        $('.run-code-btn').off('click').on('click', function () {

            $('#run_cell_select_below').click();

            $(this).hide();

            let runCodeTime = null;
            runCodeTime = setTimeout(() => {
                clearTimeout(runCodeTime);
                $(this).show();
            }, 500)

            getJupyterElement();

        })
    }

    //add text_cell or code_cell
    function addCell(codeCellHtml, runCodeHtml) {
        // $('.add-cell-code').off('click').on('click', function (e) {
        //         e.stopPropagation();
        //         $('#insert_cell_below').click();
        //         getJupyterElement();
        //     })
        // $('.add-cell-markdown').off('click').on('click', function (e) {
        //     e.stopPropagation();
        //     $('#insert_cell_below,#to_markdown').click();
        //     getJupyterElement();
        // })
        $('.move-cell-up').off('click').on('click', function (e) {
            e.stopPropagation();

            $('#move_cell_up').click();

            getJupyterElement();

        })
        $('.move-cell-down').off('click').on('click', function (e) {
            e.stopPropagation();

            $('#move_cell_down').click();

            getJupyterElement();

        })

    }


    // delete code_cell or text_cell
    function deleteCell() {

        $('.delete-cell-btn').off('click').on('click', function () {

            $('#delete_cell').click();

            getJupyterElement();

        });
    }


    //change type of cell, MarkDown or Code
    function changeType(codeCellHtml) {
        $('.markdown-btn').off('click').on('click', function () {
            $('#to_markdown').click();
            getJupyterElement();

        })

        $('.code-btn').off('click').on('click', function () {

            $('#to_code').click();
            getJupyterElement();

        })
    }

    function downloadCodes() {

        $('.download-code').off('click').on('click', function () {

            $('#download_script a').click();
        })
    }

    function postInputMessage() {
        // 传送消息给父级窗口，以记录学习时间
        window.addEventListener('input', function (e) {
            window.parent.postMessage('KeyboardInput', '*')
        })
    }
    // 页面顶部button
    function RunAll() {
        $('#run_all_cells').click();
        return true
    }
    function ClearAllOutput() {
        $('#clear_all_output').click();
        return true
    }
    function clearCurrentOutput() {
        $('#clear_current_output').click();
    }
    function openNbWeb(){
        var url = IPython.notebook.config.base_url.split('notebooks')[0];
        window.open(url+'nbextensions');
    }
    Jupyter.toolbar.add_buttons_group([
        {
            'label': '运行全部',
            'icon': 'fa fa-fast-forward',
            'callback': function () { RunAll() }
        },
        {
            'label': '清空输出',
            'icon': 'fa fa-trash', // http://fontawesome.io/icons/
            'callback': function () { ClearAllOutput() }
        },
        {
            'label': '插件管理',
            'icon': 'fa fa-cogs', // http://fontawesome.io/icons/
            'callback': function () { openNbWeb() }
        }
        // add more button here if needed.
    ],'batch_runall');
       
})

