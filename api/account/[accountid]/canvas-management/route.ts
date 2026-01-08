import { getDB } from "../lib/connnections/Connections";
import Dates from "../lib/DateTimeModules";
import UserModel from "../models/userModel";
import workspaceModel from "../models/workspaceModel";
import mongoose from "mongoose";



export async function GET(request,res): Promise<any> {
  try {
    await getDB();
    const { accountid }: any = await params;
    const user = await UserModel.findById(accountid);
    if (!user) {
      return res.json.stringify({
          success: false,
          code: "NO_USER_DATA",
          status: 404,
          message: "User not found",
        }),
        {
          status: 404,
        }
      );
    } else {
      const [workspaces] = await Promise.all([
        await workspaceModel.find({ createdBy: user._id }),
      ]);

      if (!workspaces) {
        return new res(
          JSON.stringify({
            success: false,
            code: "NO_WORKSPACE_DATA",
            message: "Create a workspace to begin",
          }),
          { status: 200 }
        );
      }
      return new res(
        JSON.stringify({
          success: true,
          code: "RECEIVED_WORKSPACE_DATA",
          status: 200,
          data: workspaces,
        }),
        {
          status: 200,
        }
      );
    }
  } catch (err: any) {
    return new res(
      JSON.stringify({
        success: false,
        code: "SERVER_WORKSPACE_ERROR",
        status: 500,
        message: "The server side workspace has issues",
      }),
      { status: 500 }
    );
  }
}

export async function POST(request: res): Promise<any> {
  try {
    await getDB();
    const body = await request.json();
    const { sub, workspacename, workspacedescription } = body;

    const user = await UserModel.findById(String(sub));
    if (!user) {
      return res.redirect(
        new URL(`http://localhost:3000/auth/signin/`, request.url)
      );
    }

    //to track user signup and dates if needed later on
    const date = Dates();
    const workspaceData: any = {};
    if (workspacename) workspaceData.workspacename = workspacename;
    if (workspacedescription)
      workspaceData.workspacedescription = workspacedescription;

    if (workspacename && workspacedescription) {
      // const newWorkspace =
      const refactorWorkspaceName = workspacename
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      const newWorkspace = await workspaceModel.create({
        name: refactorWorkspaceName,
        //above for urls
        workspacename: workspacename,
        description: workspacedescription,
        type: "Workspace",
        owner: user._id,
        collaborators: [],
        createdBy: user._id,
        dateCreated: date,
      });
      console.log(newWorkspace);

      return res.json(
        {
          success: true,
          code: "CREATED_WORKSPACE",
          status: 201,
          message: "New workspace saved",
        },
        { status: 201 }
      );
    } else {
      return res.json(
        {
          success: false,
          code: "MISSING_SUBMISSION_DATA",
          status: 400,
          message: "Fill in required fields",
        },
        { status: 400 }
      );
    }
  } catch (err: any) {
    // console.warn("Error: ", err.message);
    return new res(
      JSON.stringify({
        success: false,
        code: "SERVER_WORKSPACE_ERROR",
        status: 500,
        message: "The server side workspace has issues",
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: res,
  { params }: any
): Promise<any> {
  try {
    await getDB();
    const { accountid }: any = await params;
    const body = await request.json();
    const { sub, workspacename, workspacedescription } = body;
    // const Date = Dates;
    // console.log(
    //   "sub type: ",
    //   typeof sub,
    //   " sub = workspaceid: ",
    //   sub,
    //   workspacename,
    //   workspacedescription
    // );

    //find and assign userId
    // const userId = accountid.toString();
    const user = await UserModel.findById(accountid);
    if (!user) {
      return res.redirect(
        new URL(`http://localhost:3000/auth/signin/`, request.url)
      );
    }
    console.log("user: ", user);

    const workspace = await workspaceModel.findOne({
      _id: sub,
      createdBy: user._id,
    });
    console.log("workspace: ", workspace);

    if (!workspace) {
      return new res(
        JSON.stringify({
          success: false,
          code: "MISSING_WORKSPACE_DATA",
          status: 404,
          message: "Workspace not found",
        }),
        {
          status: 404,
        }
      );
    }

    const updatedPayload: any = {};
    if (workspacename) {
      updatedPayload.workspacename = workspacename;

      //workspacename with dashes for routing
      const refactorWorkspaceName = workspacename
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      updatedPayload.name = refactorWorkspaceName;
    }
    if (workspacedescription) updatedPayload.description = workspacedescription;

    const updatedWorkspace = await workspaceModel.updateOne(
      { _id: workspace._id },
      {
        $set: updatedPayload,
      }
    );
    // console.log(updatedWorkspace);
    if (updatedWorkspace.modifiedCount > 0) {
      return res.json(
        {
          success: true,
          code: "WORKSPACE_MANAGEMENT_DATA_PATCHED",
          status: 201,
          message: "User data component updated",
        },
        { status: 201 }
      );
    } else {
      return res.json(
        {
          message: "Fill in required fields",
        },
        { status: 400 }
      );
    }
  } catch (err: any) {
    // console.warn("Error: ", err.message);
    return new res(
      JSON.stringify({
        success: false,
        code: "SERVER_WORKSPACE_ERROR",
        status: 500,
        message: "The server side workspace has issues",
      }),
      { status: 500 }
    );
  }
}
