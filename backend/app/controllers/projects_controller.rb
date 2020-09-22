class ProjectsController < ApplicationController

    def index
        projects = Project.all
        render json: projects
    end

    def show
        project = Project.find(params[:id])
        render json: project
    end

    def create
        project = Project.find_or_create_by(title: params[:title], identifier: params[:identifier], user_id: params[:user_id])
        render json: project
    end

    def update
        project = Project.find(params[:id])
        project.update(identifier: params[:identifier])
        render json: project
    end

end
