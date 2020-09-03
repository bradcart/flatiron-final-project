class TemplatesController < ApplicationController
    def show
        template = Template.find(params[:id])
        render json: template, only: [:identifier]
    end  

    def create
        template = Template.create({
            identifier: params[:identifier],
            user_id: params[:user_id]
        })
        render json: template
    end
end
