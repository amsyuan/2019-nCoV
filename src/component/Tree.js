/**
 * Created by Yuan on 3/25/20.
 */

import React, {Component} from 'react';


import Phylotree, { placenodes, phylotreev1, Tooltip} from "react-phylotree";
import SVG from "react-phylotree/app/svg.js";
import TooltipContainer from "react-phylotree/tooltip_container.js";
import { phylotree } from "phylotree";

import * as d3 from "d3";
import { scaleLinear } from "d3-scale";

import aBSRELData from "react-phylotree/app/data/CD2.fna.ABSREL.json";



//import "bootstrap/dist/css/bootstrap.min.css";


/*import fastaParser from "alignment.js/helpers/fasta";
import ScrollBroadcaster from "alignment.js/helpers/ScrollBroadcaster";
import { nucleotide_color } from "alignment.js/helpers/colors";
import BaseAlignment from "alignment.js/components/BaseAlignment";
import { BaseSequenceAxis } from "alignment.js/components/SequenceAxis";

import Placeholder from "alignment.js/components/Placeholder";
import sortFASTAAndNewick from "alignment.js/helpers/jointSort.js";*/


require("phylotree/build/phylotree.css");




/*function accessor(node) {
    const bl = aBSRELData["branch attributes"]["0"][node.data.name]["Baseline MG94xREV"];
    return bl;
}*/

function labelStyler (branch) {
    //label color
    const identifier = branch.name.split('|')[2],
        fill = identifier == 'China' ? 'red' : 'blue';
    return { fill};
}

function TooltipContents(props) {
    var infor = props.data.name
    return (<TooltipContainer
        tooltip_width={200}
        tooltip_height={100}
        {...props}
        >
        <rect
            x={0}
            y={0}
            width={200}
            height={50}
            rx={15}
            fill='gray'
            opacity={.6}
            />
        <text
            x={100}
            y={30}
            fill="black"
            textAnchor="middle"
            >
            {infor}
        </text>
    </TooltipContainer>);
}

class Tree extends Component {

    /*componentDidMount() {
        this.drawTree();
    }

    drawTree() {

        const treenwk = "(('EPI_ISL_404895|hCoV-19/USA/WA1/2020|USA|Washington|SnohomishCounty|2020-01-19':9.999999999994822E-9,('EPI_ISL_413650|hCoV-19/USA/WA15-UW11/2020|USA|Washington||2020-03-05':3.3980000000000024E-5,('EPI_ISL_413455|hCoV-19/USA/WA4-UW2/2020|USA|Washington||2020-02-28':0.0,(('EPI_ISL_415608|hCoV-19/USA/WA-UW43/2020|USA|Washington||2020-03-08':6.799000000000003E-5,'EPI_ISL_413928|hCoV-19/USA/CA-CDPH-UC9/2020|USA|California|SanFrancisco|2020-03-05':1.3598999999999995E-4):9.999999999994822E-9,('EPI_ISL_414363|hCoV-19/USA/WA-UW15/2020|USA|Washington||2020-03-04':3.399000000000002E-5,'EPI_ISL_414595|hCoV-19/USA/WA-UW26/2020|USA|Washington|Kirkland|2020-03-05':3.399000000000002E-5):0.0):9.999999999994822E-9):9.999999999994822E-9):6.797999999999998E-5):1.6990000000000022E-5,(('EPI_ISL_406801|hCoV-19/Wuhan/WH04/2020|China|Hubei|Wuhan|2020-01-05':0.0,('EPI_ISL_407193|hCoV-19/SouthKorea/KCDC03/2020|SouthKorea|Gyeonggi-do||2020-01-25':6.796999999999999E-5,(('EPI_ISL_410718|hCoV-19/Australia/QLD04/2020|Australia|Queensland|GoldCoast|2020-02-05':0.0,'EPI_ISL_415461|hCoV-19/Netherlands/Gelderland_1/2020|Netherlands|Gelderland||2020-03-10':3.399000000000002E-5):3.3980000000000024E-5,('EPI_ISL_413697|hCoV-19/China/WF0012/2020|China|||2020-02':6.796999999999999E-5,('EPI_ISL_415151|hCoV-19/USA/NY2-PV08100/2020|USA|NewYork||2020-03-04':1.7001999999999995E-4,'EPI_ISL_414938|hCoV-19/Shandong/LY005/2020|China|Shandong||2020-01-24':3.3980000000000024E-5):0.0):0.0):0.0):9.999999999994822E-9):0.0,(('EPI_ISL_403932|hCoV-19/Guangdong/20SF012/2020|China|Guandong|Shenzhen|2020-01-14':0.0,'EPI_ISL_408666|hCoV-19/Japan/TY-WK-501/2020|Japan|Tokyo||2020-01-31':3.399000000000002E-5):3.3980000000000024E-5,(('EPI_ISL_414380|hCoV-19/Singapore/14/2020|Singapore|||2020-02-19':0.0,'EPI_ISL_408668|hCoV-19/Vietnam/VR03-38142/2020|Vietnam|ThanhHoa||2020-01-24':1.0198999999999999E-4):9.999999999994822E-9,('EPI_ISL_414379|hCoV-19/Singapore/13/2020|Singapore|||2020-02-18':6.889E-5,('EPI_ISL_414378|hCoV-19/Singapore/12/2020|Singapore|||2020-02-17':6.889E-5,('EPI_ISL_403936|hCoV-19/Guangdong/20SF028/2020|China|Guangdong|Zhuhai|2020-01-17':3.3980000000000024E-5,(('EPI_ISL_406535|hCoV-19/Foshan/20SF210/2020|China|Guangdong|Foshan|2020-01-22':3.3980000000000024E-5,((('EPI_ISL_406596|hCoV-19/France/IDF0372/2020|France|Ile-de-France|Paris|2020-01-23':3.3980000000000024E-5,('EPI_ISL_408977|hCoV-19/Australia/NSW03/2020|Australia|NewSouthWales|Sydney|2020-01-25':0.0,('EPI_ISL_410536|hCoV-19/Singapore/5/2020|Singapore|||2020-02-06':3.3980000000000024E-5,('EPI_ISL_412029|hCoV-19/HongKong/VB20024950/2020|HongKong|||2020-01-30':0.0,'EPI_ISL_414517|hCoV-19/HongKong/case90_VM20002907/2020|HongKong|||2020-02-25':1.7000000000000007E-4):3.3980000000000024E-5):9.999999999994822E-9):0.0):3.399000000000002E-5,(('EPI_ISL_410546|hCoV-19/Italy/INMI1-cs/2020|Italy|Rome||2020-01-31':9.999999999994822E-9,('EPI_ISL_414006|hCoV-19/England/200990724/2020|UnitedKingdom|England||2020-02-28':1.0200999999999998E-4,'EPI_ISL_414529|hCoV-19/Netherlands/NoordBrabant_20/2020|Netherlands|NoordBrabant||2020-03-04':3.422000000000001E-5):3.399000000000002E-5):3.399000000000002E-5,('EPI_ISL_407988|hCoV-19/Singapore/3/2020|Singapore|||2020-02-01':0.0,('EPI_ISL_408430|hCoV-19/France/IDF0515/2020|France|Ile-de-France|Paris|2020-01-29':6.797999999999998E-5,('EPI_ISL_412969|hCoV-19/Japan/Hu_DP_Kng_19-027/2020|Japan|||2020-02-10':3.3980000000000024E-5,('EPI_ISL_415741|hCoV-19/Taiwan/CGMH-CGU-03/2020|Taiwan|Taoyuan||2020-02-26':1.0198E-4,('EPI_ISL_413595|hCoV-19/Australia/NSW09/2020|Australia|NSW|Sydney|2020-02-28':1.7000999999999995E-4,'EPI_ISL_416331|hCoV-19/China/Shanghai/SH0022|China|Shanghai||2020-01-30':6.796999999999999E-5):9.999999999994822E-9):6.796999999999999E-5):9.999999999994822E-9):9.999999999994822E-9):9.999999999994822E-9):3.3980000000000024E-5):9.999999999994822E-9,('EPI_ISL_407987|hCoV-19/Singapore/2/2020|Singapore|||2020-01-25':3.399000000000002E-5,('EPI_ISL_408008|hCoV-19/USA/CA3/2020|USA|California||2020-01-29':1.0198999999999999E-4,('EPI_ISL_411955|hCoV-19/USA/CA8/2020|USA|California||2020-02-10':3.3980000000000024E-5,(('EPI_ISL_413580|hCoV-19/Netherlands/Oisterwijk_1364072/2020|Netherlands|Oisterwijk||2020-03-02':0.0,('EPI_ISL_413692|hCoV-19/China/WF0002/2020|China|||2020-01':6.796999999999999E-5,('EPI_ISL_414505|hCoV-19/Germany/NRW-06/2020|Germany|NorthRhineWestphalia|HeinsbergDistrict|2020-02-27':6.797999999999998E-5,('NC_045512.2|Wuhan-Hu-1|China|||2019-12-01':0.0,'EPI_ISL_416353|hCoV-19/China/Shanghai/SH0044|China|Shanghai||2020-02-04':3.3980000000000024E-5):0.0):0.0):9.999999999994822E-9):0.0,(('EPI_ISL_415517|hCoV-19/Netherlands/NoordBrabant_61/2020|Netherlands|NoordBrabant||2020':6.797999999999998E-5,'EPI_ISL_413577|hCoV-19/Netherlands/Naarden_1364774/2020|Netherlands|Naarden||2020-03-02':0.0):0.0,('EPI_ISL_414536|hCoV-19/Netherlands/NoordBrabant_27/2020|Netherlands|NoordBrabant||2020-03-08':3.399000000000002E-5,('EPI_ISL_415501|hCoV-19/Netherlands/NoordBrabant_44/2020|Netherlands|NoordBrabant||2020-03-11':0.0,('EPI_ISL_415506|hCoV-19/Netherlands/NoordBrabant_49/2020|Netherlands|NoordBrabant||2020-03-11':0.0,('EPI_ISL_413568|hCoV-19/Netherlands/Dalen_1363624/2020|Netherlands|Dalen||2020-03-01':0.0,'EPI_ISL_413567|hCoV-19/Netherlands/Coevorden_1363618/2020|Netherlands|Coevorden||2020':9.999999999994822E-9):9.999999999994822E-9):9.999999999994822E-9):9.999999999994822E-9):3.3980000000000024E-5):3.3980000000000024E-5):9.999999999994822E-9):0.0):9.999999999994822E-9):0.0):9.999999999994822E-9):0.0,('EPI_ISL_406533|hCoV-19/Guangzhou/20SF206/2020|China|Guangdong|Guangzhou|2020-01-22':6.797999999999998E-5,('EPI_ISL_415704|hCoV-19/Switzerland/BE2536/2020|Switzerland|||2020-03-04':3.399000000000002E-5,(('EPI_ISL_415460|hCoV-19/Netherlands/Flevoland_1/2020|Netherlands|Flevoland||2020-03-09':3.399000000000002E-5,(('EPI_ISL_414627|hCoV-19/France/HF1795/2020|France|HautsdeFrance|Compiegne|2020-03-02':0.0,('EPI_ISL_415543|hCoV-19/USA/UPHL-05/2020|USA|Utah||2020-03-13':3.399000000000002E-5,'EPI_ISL_415597|hCoV-19/USA/WA-UW69/2020|USA|Washington|Seattle|2020-03-10':3.399000000000002E-5):9.999999999940612E-9):3.399000000000002E-5,('EPI_ISL_416521|hCoV-19/SaudiArabia/SCDC-3321/2020|SaudiArabia|||2020-03-10':6.799000000000003E-5,('EPI_ISL_414626|hCoV-19/France/HF1684/2020|France|HautsdeFrance|CrepyenValois|2020-02-29':0.0,'EPI_ISL_414638|hCoV-19/France/HF1995/2020|France|HautsdeFrance|Compiegne|2020-03-04':3.399000000000002E-5):3.3989999999999964E-5):9.999999999994822E-9):3.399000000000002E-5):9.999999999940612E-9,(('EPI_ISL_414445|hCoV-19/Netherlands/ZuidHolland_9/2020|Netherlands|ZuidHolland||2020-03-03':1.7002E-4,('EPI_ISL_415640|hCoV-19/Scotland/EDB003/2020|UnitedKingdom|Scotland||2020-03-08':6.800000000000003E-5,'EPI_ISL_415473|hCoV-19/Netherlands/NA_17/2020|Netherlands|||2020-03-09':6.799000000000003E-5):0.0):0.0,('EPI_ISL_414019|hCoV-19/Switzerland/GE3121/2020|Switzerland|Geneva||2020-02-27':3.397999999999997E-5,('EPI_ISL_414027|hCoV-19/Scotland/CVR05/2020|UnitedKingdom|Scotland||2020-03-04':3.3980000000000024E-5,('EPI_ISL_414523|hCoV-19/England/200990660/2020|UnitedKingdom|England||2020-02-27':3.3989999999999964E-5,('EPI_ISL_415462|hCoV-19/Netherlands/Gelderland_2/2020|Netherlands|Gelderland||2020-03-09':3.3980000000000024E-5,('EPI_ISL_412973|hCoV-19/Italy/CDG1/2020|Italy|Lombardy||2020-02-20':0.0,('EPI_ISL_414437|hCoV-19/Netherlands/Utrecht_3/2020|Netherlands|Utrecht||2020-03-03':1.0000000000049032E-8,('EPI_ISL_413997|hCoV-19/Switzerland/GE3895/2020|Switzerland|Geneva||2020-02-26':3.397999999999997E-5,('EPI_ISL_414023|hCoV-19/Switzerland/VD5615/2020|Switzerland|Vaud||2020-03-01':3.399000000000002E-5,('EPI_ISL_415158|hCoV-19/Belgium/QKJ-03015/2020|Belgium|Brussels||2020-03-01':6.801000000000002E-5,('EPI_ISL_415457|hCoV-19/Switzerland/AG7120/2020|Switzerland|||2020-02-29':3.397999999999997E-5,('EPI_ISL_415458|hCoV-19/Switzerland/GE8102/2020|Switzerland|||2020-03-01':3.399000000000002E-5,('EPI_ISL_415698|hCoV-19/Switzerland/GR2988/2020|Switzerland|||2020-02-27':3.3989999999999964E-5,('EPI_ISL_413022|hCoV-19/Switzerland/1000477796/2020|Switzerland|Zurich||2020-02-29':0.0,('EPI_ISL_414460|hCoV-19/Netherlands/Overijssel_2/2020|Netherlands|Overijssel||2020-03-03':9.999999999940612E-9,(('EPI_ISL_414429|hCoV-19/Netherlands/NoordBrabant_3/2020|Netherlands|NoordBrabant||2020-03-02':0.0,'EPI_ISL_415467|hCoV-19/Netherlands/NA_11/2020|Netherlands|||2020-03-10':3.399999999999996E-5):3.399000000000002E-5,('EPI_ISL_414545|hCoV-19/Netherlands/NoordBrabant_36/2020|Netherlands|NoordBrabant||2020-03-03':3.399000000000002E-5,('EPI_ISL_414554|hCoV-19/Netherlands/Utrecht_15/2020|Netherlands|Utrecht||2020-03-08':3.399000000000002E-5,('EPI_ISL_413584|hCoV-19/Netherlands/Rotterdam_1364740/2020|Netherlands|Rotterdam||2020-03-03':0.0,('EPI_ISL_414424|hCoV-19/Netherlands/Limburg_2/2020|Netherlands|Limburg||2020-03-03':0.0,('EPI_ISL_414507|hCoV-19/Germany/NRW-011/2020|Germany|NorthRhineWestphalia|Duesseldorf|2020-03-03':9.999999999940612E-9,'EPI_ISL_414449|hCoV-19/Netherlands/NoordBrabant_2/2020|Netherlands|NoordBrabant||2020-03-03':0.0):1.0000000000049032E-8):9.999999999940612E-9):1.0000000000049032E-8):1.0000000000049032E-8):9.999999999940612E-9):3.399000000000002E-5):9.999999999940612E-9):1.0000000000049032E-8):9.999999999940612E-9):1.0000000000049032E-8):9.999999999940612E-9):0.0):1.0000000000049032E-8):1.0200999999999993E-4):1.0000000000049032E-8):9.999999999940612E-9):1.0000000000049032E-8):9.999999999940612E-9):1.0000000000049032E-8):9.999999999940612E-9):1.0000000000049032E-8):9.999999999940612E-9):1.0197000000000006E-4):9.999999999994822E-9):9.999999999994822E-9):6.795999999999999E-5):9.999999999994822E-9):9.999999999994822E-9):9.999999999994822E-9):0.0):1.699E-5);"

        const tree = new tmp(treenwk);

        tmp.svg(d3.select(document.getElementById('d3-bar')).append("svg"));
        tmp.layout();

    }
    render(){
        return <div id='d3-tree'></div>
        //return <div id={"#" + this.props.id}></div>
    }*/


    render(){

        const tree_width = 700;
        const alignment_height = 800;

        const full_pixel_height = alignment_height;
        const full_pixel_width = tree_width;

        const padding = 10;

        var treenwk = "(('EPI_ISL_404895|hCoV-19/USA/WA1/2020|USA|Washington|SnohomishCounty|2020-01-19':9.999999999994822E-9,('EPI_ISL_413650|hCoV-19/USA/WA15-UW11/2020|USA|Washington||2020-03-05':3.3980000000000024E-5,('EPI_ISL_413455|hCoV-19/USA/WA4-UW2/2020|USA|Washington||2020-02-28':0.0,(('EPI_ISL_415608|hCoV-19/USA/WA-UW43/2020|USA|Washington||2020-03-08':6.799000000000003E-5,'EPI_ISL_413928|hCoV-19/USA/CA-CDPH-UC9/2020|USA|California|SanFrancisco|2020-03-05':1.3598999999999995E-4):9.999999999994822E-9,('EPI_ISL_414363|hCoV-19/USA/WA-UW15/2020|USA|Washington||2020-03-04':3.399000000000002E-5,'EPI_ISL_414595|hCoV-19/USA/WA-UW26/2020|USA|Washington|Kirkland|2020-03-05':3.399000000000002E-5):0.0):9.999999999994822E-9):9.999999999994822E-9):6.797999999999998E-5):1.6990000000000022E-5,(('EPI_ISL_406801|hCoV-19/Wuhan/WH04/2020|China|Hubei|Wuhan|2020-01-05':0.0,('EPI_ISL_407193|hCoV-19/SouthKorea/KCDC03/2020|SouthKorea|Gyeonggi-do||2020-01-25':6.796999999999999E-5,(('EPI_ISL_410718|hCoV-19/Australia/QLD04/2020|Australia|Queensland|GoldCoast|2020-02-05':0.0,'EPI_ISL_415461|hCoV-19/Netherlands/Gelderland_1/2020|Netherlands|Gelderland||2020-03-10':3.399000000000002E-5):3.3980000000000024E-5,('EPI_ISL_413697|hCoV-19/China/WF0012/2020|China|||2020-02':6.796999999999999E-5,('EPI_ISL_415151|hCoV-19/USA/NY2-PV08100/2020|USA|NewYork||2020-03-04':1.7001999999999995E-4,'EPI_ISL_414938|hCoV-19/Shandong/LY005/2020|China|Shandong||2020-01-24':3.3980000000000024E-5):0.0):0.0):0.0):9.999999999994822E-9):0.0,(('EPI_ISL_403932|hCoV-19/Guangdong/20SF012/2020|China|Guandong|Shenzhen|2020-01-14':0.0,'EPI_ISL_408666|hCoV-19/Japan/TY-WK-501/2020|Japan|Tokyo||2020-01-31':3.399000000000002E-5):3.3980000000000024E-5,(('EPI_ISL_414380|hCoV-19/Singapore/14/2020|Singapore|||2020-02-19':0.0,'EPI_ISL_408668|hCoV-19/Vietnam/VR03-38142/2020|Vietnam|ThanhHoa||2020-01-24':1.0198999999999999E-4):9.999999999994822E-9,('EPI_ISL_414379|hCoV-19/Singapore/13/2020|Singapore|||2020-02-18':6.889E-5,('EPI_ISL_414378|hCoV-19/Singapore/12/2020|Singapore|||2020-02-17':6.889E-5,('EPI_ISL_403936|hCoV-19/Guangdong/20SF028/2020|China|Guangdong|Zhuhai|2020-01-17':3.3980000000000024E-5,(('EPI_ISL_406535|hCoV-19/Foshan/20SF210/2020|China|Guangdong|Foshan|2020-01-22':3.3980000000000024E-5,((('EPI_ISL_406596|hCoV-19/France/IDF0372/2020|France|Ile-de-France|Paris|2020-01-23':3.3980000000000024E-5,('EPI_ISL_408977|hCoV-19/Australia/NSW03/2020|Australia|NewSouthWales|Sydney|2020-01-25':0.0,('EPI_ISL_410536|hCoV-19/Singapore/5/2020|Singapore|||2020-02-06':3.3980000000000024E-5,('EPI_ISL_412029|hCoV-19/HongKong/VB20024950/2020|HongKong|||2020-01-30':0.0,'EPI_ISL_414517|hCoV-19/HongKong/case90_VM20002907/2020|HongKong|||2020-02-25':1.7000000000000007E-4):3.3980000000000024E-5):9.999999999994822E-9):0.0):3.399000000000002E-5,(('EPI_ISL_410546|hCoV-19/Italy/INMI1-cs/2020|Italy|Rome||2020-01-31':9.999999999994822E-9,('EPI_ISL_414006|hCoV-19/England/200990724/2020|UnitedKingdom|England||2020-02-28':1.0200999999999998E-4,'EPI_ISL_414529|hCoV-19/Netherlands/NoordBrabant_20/2020|Netherlands|NoordBrabant||2020-03-04':3.422000000000001E-5):3.399000000000002E-5):3.399000000000002E-5,('EPI_ISL_407988|hCoV-19/Singapore/3/2020|Singapore|||2020-02-01':0.0,('EPI_ISL_408430|hCoV-19/France/IDF0515/2020|France|Ile-de-France|Paris|2020-01-29':6.797999999999998E-5,('EPI_ISL_412969|hCoV-19/Japan/Hu_DP_Kng_19-027/2020|Japan|||2020-02-10':3.3980000000000024E-5,('EPI_ISL_415741|hCoV-19/Taiwan/CGMH-CGU-03/2020|Taiwan|Taoyuan||2020-02-26':1.0198E-4,('EPI_ISL_413595|hCoV-19/Australia/NSW09/2020|Australia|NSW|Sydney|2020-02-28':1.7000999999999995E-4,'EPI_ISL_416331|hCoV-19/China/Shanghai/SH0022|China|Shanghai||2020-01-30':6.796999999999999E-5):9.999999999994822E-9):6.796999999999999E-5):9.999999999994822E-9):9.999999999994822E-9):9.999999999994822E-9):3.3980000000000024E-5):9.999999999994822E-9,('EPI_ISL_407987|hCoV-19/Singapore/2/2020|Singapore|||2020-01-25':3.399000000000002E-5,('EPI_ISL_408008|hCoV-19/USA/CA3/2020|USA|California||2020-01-29':1.0198999999999999E-4,('EPI_ISL_411955|hCoV-19/USA/CA8/2020|USA|California||2020-02-10':3.3980000000000024E-5,(('EPI_ISL_413580|hCoV-19/Netherlands/Oisterwijk_1364072/2020|Netherlands|Oisterwijk||2020-03-02':0.0,('EPI_ISL_413692|hCoV-19/China/WF0002/2020|China|||2020-01':6.796999999999999E-5,('EPI_ISL_414505|hCoV-19/Germany/NRW-06/2020|Germany|NorthRhineWestphalia|HeinsbergDistrict|2020-02-27':6.797999999999998E-5,('NC_045512.2|Wuhan-Hu-1|China|||2019-12-01':0.0,'EPI_ISL_416353|hCoV-19/China/Shanghai/SH0044|China|Shanghai||2020-02-04':3.3980000000000024E-5):0.0):0.0):9.999999999994822E-9):0.0,(('EPI_ISL_415517|hCoV-19/Netherlands/NoordBrabant_61/2020|Netherlands|NoordBrabant||2020':6.797999999999998E-5,'EPI_ISL_413577|hCoV-19/Netherlands/Naarden_1364774/2020|Netherlands|Naarden||2020-03-02':0.0):0.0,('EPI_ISL_414536|hCoV-19/Netherlands/NoordBrabant_27/2020|Netherlands|NoordBrabant||2020-03-08':3.399000000000002E-5,('EPI_ISL_415501|hCoV-19/Netherlands/NoordBrabant_44/2020|Netherlands|NoordBrabant||2020-03-11':0.0,('EPI_ISL_415506|hCoV-19/Netherlands/NoordBrabant_49/2020|Netherlands|NoordBrabant||2020-03-11':0.0,('EPI_ISL_413568|hCoV-19/Netherlands/Dalen_1363624/2020|Netherlands|Dalen||2020-03-01':0.0,'EPI_ISL_413567|hCoV-19/Netherlands/Coevorden_1363618/2020|Netherlands|Coevorden||2020':9.999999999994822E-9):9.999999999994822E-9):9.999999999994822E-9):9.999999999994822E-9):3.3980000000000024E-5):3.3980000000000024E-5):9.999999999994822E-9):0.0):9.999999999994822E-9):0.0):9.999999999994822E-9):0.0,('EPI_ISL_406533|hCoV-19/Guangzhou/20SF206/2020|China|Guangdong|Guangzhou|2020-01-22':6.797999999999998E-5,('EPI_ISL_415704|hCoV-19/Switzerland/BE2536/2020|Switzerland|||2020-03-04':3.399000000000002E-5,(('EPI_ISL_415460|hCoV-19/Netherlands/Flevoland_1/2020|Netherlands|Flevoland||2020-03-09':3.399000000000002E-5,(('EPI_ISL_414627|hCoV-19/France/HF1795/2020|France|HautsdeFrance|Compiegne|2020-03-02':0.0,('EPI_ISL_415543|hCoV-19/USA/UPHL-05/2020|USA|Utah||2020-03-13':3.399000000000002E-5,'EPI_ISL_415597|hCoV-19/USA/WA-UW69/2020|USA|Washington|Seattle|2020-03-10':3.399000000000002E-5):9.999999999940612E-9):3.399000000000002E-5,('EPI_ISL_416521|hCoV-19/SaudiArabia/SCDC-3321/2020|SaudiArabia|||2020-03-10':6.799000000000003E-5,('EPI_ISL_414626|hCoV-19/France/HF1684/2020|France|HautsdeFrance|CrepyenValois|2020-02-29':0.0,'EPI_ISL_414638|hCoV-19/France/HF1995/2020|France|HautsdeFrance|Compiegne|2020-03-04':3.399000000000002E-5):3.3989999999999964E-5):9.999999999994822E-9):3.399000000000002E-5):9.999999999940612E-9,(('EPI_ISL_414445|hCoV-19/Netherlands/ZuidHolland_9/2020|Netherlands|ZuidHolland||2020-03-03':1.7002E-4,('EPI_ISL_415640|hCoV-19/Scotland/EDB003/2020|UnitedKingdom|Scotland||2020-03-08':6.800000000000003E-5,'EPI_ISL_415473|hCoV-19/Netherlands/NA_17/2020|Netherlands|||2020-03-09':6.799000000000003E-5):0.0):0.0,('EPI_ISL_414019|hCoV-19/Switzerland/GE3121/2020|Switzerland|Geneva||2020-02-27':3.397999999999997E-5,('EPI_ISL_414027|hCoV-19/Scotland/CVR05/2020|UnitedKingdom|Scotland||2020-03-04':3.3980000000000024E-5,('EPI_ISL_414523|hCoV-19/England/200990660/2020|UnitedKingdom|England||2020-02-27':3.3989999999999964E-5,('EPI_ISL_415462|hCoV-19/Netherlands/Gelderland_2/2020|Netherlands|Gelderland||2020-03-09':3.3980000000000024E-5,('EPI_ISL_412973|hCoV-19/Italy/CDG1/2020|Italy|Lombardy||2020-02-20':0.0,('EPI_ISL_414437|hCoV-19/Netherlands/Utrecht_3/2020|Netherlands|Utrecht||2020-03-03':1.0000000000049032E-8,('EPI_ISL_413997|hCoV-19/Switzerland/GE3895/2020|Switzerland|Geneva||2020-02-26':3.397999999999997E-5,('EPI_ISL_414023|hCoV-19/Switzerland/VD5615/2020|Switzerland|Vaud||2020-03-01':3.399000000000002E-5,('EPI_ISL_415158|hCoV-19/Belgium/QKJ-03015/2020|Belgium|Brussels||2020-03-01':6.801000000000002E-5,('EPI_ISL_415457|hCoV-19/Switzerland/AG7120/2020|Switzerland|||2020-02-29':3.397999999999997E-5,('EPI_ISL_415458|hCoV-19/Switzerland/GE8102/2020|Switzerland|||2020-03-01':3.399000000000002E-5,('EPI_ISL_415698|hCoV-19/Switzerland/GR2988/2020|Switzerland|||2020-02-27':3.3989999999999964E-5,('EPI_ISL_413022|hCoV-19/Switzerland/1000477796/2020|Switzerland|Zurich||2020-02-29':0.0,('EPI_ISL_414460|hCoV-19/Netherlands/Overijssel_2/2020|Netherlands|Overijssel||2020-03-03':9.999999999940612E-9,(('EPI_ISL_414429|hCoV-19/Netherlands/NoordBrabant_3/2020|Netherlands|NoordBrabant||2020-03-02':0.0,'EPI_ISL_415467|hCoV-19/Netherlands/NA_11/2020|Netherlands|||2020-03-10':3.399999999999996E-5):3.399000000000002E-5,('EPI_ISL_414545|hCoV-19/Netherlands/NoordBrabant_36/2020|Netherlands|NoordBrabant||2020-03-03':3.399000000000002E-5,('EPI_ISL_414554|hCoV-19/Netherlands/Utrecht_15/2020|Netherlands|Utrecht||2020-03-08':3.399000000000002E-5,('EPI_ISL_413584|hCoV-19/Netherlands/Rotterdam_1364740/2020|Netherlands|Rotterdam||2020-03-03':0.0,('EPI_ISL_414424|hCoV-19/Netherlands/Limburg_2/2020|Netherlands|Limburg||2020-03-03':0.0,('EPI_ISL_414507|hCoV-19/Germany/NRW-011/2020|Germany|NorthRhineWestphalia|Duesseldorf|2020-03-03':9.999999999940612E-9,'EPI_ISL_414449|hCoV-19/Netherlands/NoordBrabant_2/2020|Netherlands|NoordBrabant||2020-03-03':0.0):1.0000000000049032E-8):9.999999999940612E-9):1.0000000000049032E-8):1.0000000000049032E-8):9.999999999940612E-9):3.399000000000002E-5):9.999999999940612E-9):1.0000000000049032E-8):9.999999999940612E-9):1.0000000000049032E-8):9.999999999940612E-9):0.0):1.0000000000049032E-8):1.0200999999999993E-4):1.0000000000049032E-8):9.999999999940612E-9):1.0000000000049032E-8):9.999999999940612E-9):1.0000000000049032E-8):9.999999999940612E-9):1.0000000000049032E-8):9.999999999940612E-9):1.0197000000000006E-4):9.999999999994822E-9):9.999999999994822E-9):6.795999999999999E-5):9.999999999994822E-9):9.999999999994822E-9):9.999999999994822E-9):0.0):1.699E-5);"
       // const tree = new phylotree(treenwk);


        /*const size_props = { width: 500, height: 500 },
            treenwk = aBSRELData.input.trees[0],
            branch_dict = aBSRELData["branch attributes"]["0"],
            color_scale = scaleLinear().domain([0, 2]).range(["#000000", "#FF0000"]);*/

        function branchStyler(branch) {
            const name = branch.name;
            /*const omega = branch_dict[name]["Baseline MG94xREV omega ratio"];
            const p_value = branch_dict[name]["Corrected P-value"];
            const width = p_value < .05 ? 2 : 1*/
            return {strokeWidth:1.5,stroke:'#AA88BB'};
        }


        //<div style={{display: "flex", justifyContent: "space-around"}}>


        return(
            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>

                <div
                    id="tree"
                    style={{
          width: full_pixel_width ,
          height: full_pixel_height ,

        }}>
            <svg width={full_pixel_width} height={full_pixel_height}>
                    <Phylotree
                        newick={treenwk}
                        transform={`translate(${padding}, ${padding})`}
                        //highlightBranches={color_scale}
                        width={tree_width - 2*padding}
                        height={full_pixel_height - 2*padding}
                        maxLabelWidth={14}
                        alignTips='left'
                        showLabels={true}
                        draw-size-bubbles
                        zoom={true}
                        labelStyler={labelStyler}
                        sort=''
                        skipPlacement={false}
                        tooltip={TooltipContents}
                        includeBLAxis
                        branchStyler={branchStyler}
                     />
            </svg>
            </div>

                </div>
        )
    }
}

/*<BaseAlignment
    sequence_data={remaining_data}
    width={alignment_width}
    height={alignment_height}
    site_size={site_size}
    site_color={nucleotide_color}
    scroll_broadcaster={scroll_broadcaster.current}
    molecule={molecule}
    amino_acid
    />
*/
//tree div  overflowY: "scroll",
//tree div overflowX: "scroll",

//branchStyler={branchStyler}
//ancestor={accessor}

//<SVG></SVG>
//internalNodeLabels
//includeBLAxis
//tooltip
// branchStyler={()=>({strokeWidth:2,stroke:color_scale(1)})}
// ancestor={accessor}
// accessor={node => {return null;}}
//branchStyler={branchStyler}

export default Tree;


