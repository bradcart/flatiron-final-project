class PagesController < ApplicationController
    def create
        page = Page.create({
            identifier: params[:identifier],
            user_id: params[:user_id]
        })
        render json: page
    end

    def show
        page = Page.find(params[:id])
        render json: page
    end
end
