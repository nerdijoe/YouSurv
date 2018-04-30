package com.poll.util;

public class RestResponseJSONViews {
    public static class Public{}
    public static class Internal extends Public{}

    public static class PublicFlightAttr extends Public{}
    public static class InternalFlightAttr extends PublicFlightAttr{}
    public static class PublicPassengerAttr extends Public{}
    public static class InternalPassengerAttr extends PublicPassengerAttr{}
    public static class PublicReservationAttr extends Public{}
    public static class InternalReservationAttr extends PublicReservationAttr{}

}
