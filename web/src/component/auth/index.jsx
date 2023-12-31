import React from "react";
import {Button,Checkbox,Form,Input} from "antd";
import './index.css'

const auth =()=>{
    function onClick(id){
        var c,    //根据id获取到的页面标签属性
            ctx,  //根据 c 获取到的内容
            max,  //最大的间隔  用于随机数生成比较  注 此处变化 可以自己设置 展示的样式是不一样的
            intertime, //定时时间间隔    数据变化时间
            width,     //页面 宽度
            height,    //页面 高度
            chinese,   //要随机跑动的字符流
            chineseLen,//要随机跑动的字符流长度
            drops,     //集合
            font_size, //文字大小
            columns,   //把数据分成多少份来展示  --集合的长度
            draw;      //定时任务 执行的方法
        // 设置 最大随机数 和 定时任务时间
        max = 0.975;intertime = 50;
        // 获取页面 属性
        c = document.getElementById(id);
        ctx = c.getContext('2d');

        // 识别浏览器 页面宽度和高度
        width = window.innerWidth;
        height = window.innerHeight;
        //设置 id对应的标签大小为识别的宽度和高度
        c.width = width; c.height = height;
        //设置 要展示的数字
        chinese = '0123456789poiuytrewqaaasdfghjklmnbvcxz[]*&^%$@'.split('');
        chineseLen = chinese.length;

        //设置展示 字体
        drops = []; font_size = 10;
        columns = parseInt(width / font_size);

        //进行动态展示的 方法
        draw = function(){
            ctx.fillStyle = "rgba( 0, 0, 0, 0.05)";
            ctx.fillRect( 0, 0, width, height);
            ctx.fillStyle = '#0F0';
            ctx.font = (Math.random() * font_size) + 'px arial';

            for(var i=0;i < columns;i++){
                drops[i] = drops[i] || 1;
                var text = chinese[Math.floor(Math.random() * chineseLen)];
                ctx.fillText(text, i * font_size, drops[i] * font_size);
                if(drops[i] * font_size > c.height && Math.random() > max){
                    drops[i] = 1;
                }
                drops[i] ++;
            }
        }
        setInterval(draw, intertime);
    };
    setTimeout(function(){onClick('c');}, 200);

    const onFinishFailed = (errorInfo) =>{
        console.log('Failed:',errorInfo)
    }

    const onFinish = (values) =>{
        
    }
    return(
        <div>
            <canvas id="c"></canvas>
            <div id="login-container">
                <Form
                    name="basic"
                    labelCol={{
                        span:6,
                    }}
                    wrapperCol={{
                        span:17,
                    }}
                    style={{
                        maxWidth:600,
                    }}
                    initialValues={{
                        remember:true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        wrapperRow={{
                            offset:4,
                            span:8,
                        }}
                        rules={[
                            {
                                required:true,
                                message: 'Please input your username!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required:true,
                                message:'Please input your password!',
                            },
                        ]}
                        >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset:4,
                            span:16,
                        }}
                        >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset:4,
                            span:16,
                        }}
                        >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )

};
export default auth;